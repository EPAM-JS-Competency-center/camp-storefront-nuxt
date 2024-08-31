import { defineStore } from 'pinia'
import type { Product, ProductsGet200Response } from '~/types/interfaces'
import type { Category as C } from '~/types/api/bff/v1/categories.types'
import api from '~/api/api'
import ProductDTO from '~/DTO/Product'
import { MAX_PAGE_PRODUCTS_COUNT, START_PAGE_NUMBER } from '~/utils/constants'
import singleProductData from '@/mock_data/product.json'
import CategoryTree from '~/DTO/categories/CategoriesTree'

interface State {
  productsInfo: {
    total: number | null
    products: ProductDTO[]
  }
  selectedProduct: ProductDTO | null
  categoriesTree: CategoryTree | null
  selectedCategory: CategoryTree | null
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

      const getSelectedCategory = (category: CategoryTree, slugs: string[]): CategoryTree | undefined => {
        const [left, ...right] = slugs

        let subTree
        if (left) {
          subTree = category.children?.find(({ id }) => id === left)
        }

        if (subTree && right.length) {
          return getSelectedCategory(subTree, right)
        }
        return subTree
      }

      this.selectedCategory = getSelectedCategory(this.categoriesTree, slugs) || this.categoriesTree
    },
    async getCategories(): Promise<void> {
        const { data } = await api<C>({
          url: '/categories',
          method: 'get',
        })

        this.categoriesTree = new CategoryTree(data)
    },

    async getCategoryProducts(categoryID?: string | number, page?: number | string) {
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
