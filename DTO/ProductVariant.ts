import type { Image, ProductVariant } from '~/types/interfaces'
import ImageDTO from '~/DTO/Image'
import ProductAttributeDTO from '~/DTO/ProductAttribute'
import { PRODUCT_ATTRS_NAME } from '~/types/enums'

export default class ProductVariantDTO {
  id: number
  sku: string
  name: string
  slug: string
  mainImage: string
  images: ImageDTO[]
  price: { currencyCode: string; centAmount: number }
  attributes: ProductAttributeDTO[]
  availability: { isOnStock: boolean; availableQty: number }
  size: ProductAttributeDTO | null
  color: ProductAttributeDTO | null

  constructor(product: ProductVariant) {
    this.id = (product.id && +product.id) || 0
    this.sku = product.sku || ''
    this.name = product.name || ''
    this.slug = product.slug || ''
    this.mainImage = (product.images && product.images[0] && product.images[0].url) || ''

    this.images =
      (product.images && product.images.map((image: Image) => new ImageDTO(image))) || []

    this.price = {
      currencyCode: (Array.isArray(product.prices) && product.prices[0]?.value?.currencyCode) || '',
      centAmount: (Array.isArray(product.prices) && product.prices[0]?.value?.centAmount) || 0,
    }
    this.attributes = product.attributes?.map(attr => new ProductAttributeDTO(attr)) || []

    this.size = this.attributes.find(attr => attr.name === PRODUCT_ATTRS_NAME.SIZE) || null
    this.color = this.attributes.find(attr => attr.name === PRODUCT_ATTRS_NAME.COLOR) || null

    this.availability = {
      isOnStock: product.availability?.isOnStock || false,
      availableQty: product.availability?.availableQty || 0,
    }
  }
}
