import { defineStore } from 'pinia'
import type { Category, Product, ProductsGet200Response } from '~/types/interfaces'
import api from '~/api/api'
import ProductDTO from '~/DTO/Product'
import { MAX_PAGE_PRODUCTS_COUNT, START_PAGE_NUMBER } from '~/utils/constants'
// import CategoriesTreeDTO from '~/DTO/categories/CategoriesTree'
import CategoryDTO from '~/DTO/categories/ChildCategory'

// Remove this when you start implementing the API
// 1 /api/v1/categories
import categoriesData from '@/mock_data/categories.json'
// 2 /api/v1/products
import productsData from '@/mock_data/products.json'
// 2 /api/v1/products/{sku}
import singleProductData from '@/mock_data/product.json'

interface State {
  productsInfo: {
    total: number | null
    products: ProductDTO[]
  }
  selectedProduct: ProductDTO | null
  categoriesTree: CategoryDTO | null
  selectedCategory: CategoryDTO | null
  defaultCategoryId?: number | string
  categoriesMocked: boolean
  productsMocked: boolean
  pdpIsMocked: boolean
}

export default defineStore('product', {
  state: (): State => ({
    productsInfo: {
      total: null,
      products: [],
    },
    selectedProduct: null,
    categoriesTree: null,
    selectedCategory: null,
    categoriesMocked: false,
    defaultCategoryId: 0,
    productsMocked: false,
    pdpIsMocked: false,
  }),

  actions: {
    setActiveCategoryByPath(slugs: string[] = []): void {
      if (!this.categoriesTree) {
        return
      }

      const filteredSlugs = slugs.filter(slug => slug !== this.categoriesTree?.slug)

      if (!filteredSlugs.length) {
        this.selectedCategory = this.categoriesTree
      } else {
        this.selectedCategory = filteredSlugs.reduce((acc: null | CategoryDTO, slug) => {
          const categoryToResearch = acc ?? (this.categoriesTree as CategoryDTO)
          acc = categoryToResearch.childCategories.find(category => category.slug === slug) || null

          return acc
        }, null)
      }
    },
    async getCategories(): Promise<void> {
      try {
        const { data } = await api<Category[]>({
          url: '/categories',
          method: 'get',
        })

        this.categoriesTree = new CategoryDTO(data)
       } catch {
        const data = await new Promise<Category[]>((resolve) => {
          setTimeout(() => {
            resolve(categoriesData)
          }, 1000)
        })

        this.categoriesTree = new CategoryDTO(data)
        this.categoriesMocked = true
      }

      // set default category if exists
      if (this.categoriesTree) {
        this.defaultCategoryId = this.categoriesTree.id
      }
    },

    async getCategoryProducts(categoryID?: string | number, page?: number | string) {
      try {
        this.productsInfo.total = null

        const { data } = await api<ProductsGet200Response>({
          url: '/products',
          method: 'get',
          params: {
            categoryId: categoryID ?? this.defaultCategoryId,
            offset: page ?? START_PAGE_NUMBER,
            limit: MAX_PAGE_PRODUCTS_COUNT,
          },
        })

        this.productsInfo.total = data.total ?? null
        this.productsInfo.products = data.results?.map(product => new ProductDTO(product)) || []
      } catch {
        const data = await new Promise<ProductsGet200Response>(resolve => {
          setTimeout(() => {
            resolve({
              ...(productsData as ProductsGet200Response),
            })
          }, 1000)
        })

        this.productsInfo.total = data.total ?? null
        this.productsInfo.products = data.results?.map(product => new ProductDTO(product)) || []
        this.productsMocked = true
      }
    },

    async getProduct(sku: string) {
      try {
        this.selectedProduct = null
        const { data } = await api<Product>({
          url: '/products/$sku',
          method: 'get',
          pathParams: {
            $sku: sku,
          },
        })

        this.selectedProduct = new ProductDTO(data)
        this.pdpIsMocked = false
      } catch {
        const data = await new Promise<Product>((resolve) => {
          setTimeout(() => {
            const productWithVariant = {
              ...singleProductData,
              masterVariant: singleProductData.variants.find(variant => variant.sku === sku) || singleProductData.masterVariant
            }

            resolve(productWithVariant as Product)
          }, 1000)
        })
        this.selectedProduct = new ProductDTO(data)
        this.pdpIsMocked = true
      }
    },
  },
})
