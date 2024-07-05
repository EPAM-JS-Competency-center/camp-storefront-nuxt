import type { Product } from '~/types/interfaces'
import ProductVariantDTO from '~/DTO/ProductVariant'
import CategoryDTO from '~/DTO/Category'
import ProductAttributeDTO from '~/DTO/ProductAttribute'
import { PRODUCT_ATTRS_NAME } from '~/types/enums'

export default class ProductDTO {
  id: string
  name: string
  description: string
  slug: string
  categories: CategoryDTO[]
  variants: ProductVariantDTO[]
  sizes: ProductAttributeDTO[]
  colors: ProductAttributeDTO[]
  masterVariant: ProductVariantDTO

  constructor(product: Product) {
    this.id = product.id || ''
    this.name = product.name || ''
    this.description = product.description || ''
    this.slug = product.slug || ''
    this.categories =
      (product.categories && product.categories.map(category => new CategoryDTO(category))) || []
    this.masterVariant = new ProductVariantDTO(product.masterVariant || {})
    this.variants = product.variants?.map(variant => new ProductVariantDTO(variant)) || []
    this.sizes = Object.values(
      this.variants.reduce(
        (acc, variant) => {
          variant.attributes.forEach((attr) => {
            if (attr.name === PRODUCT_ATTRS_NAME.SIZE && attr.key) { acc[attr.key] = attr }
          })

          return acc
        },
        {} as Record<string, ProductAttributeDTO>,
      ),
    )
    this.colors = Object.values(
      this.variants.reduce(
        (acc, variant) => {
          variant.attributes.forEach((attr) => {
            if (attr.name === PRODUCT_ATTRS_NAME.COLOR && attr.key) { acc[attr.key] = attr }
          })

          return acc
        },
        {} as Record<string, ProductAttributeDTO>,
      ),
    )
  }
}
