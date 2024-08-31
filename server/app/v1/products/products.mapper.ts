import type { MagentoProduct } from '~/types/api/data/magento/products.types'
import type { Product, ProductVariant } from '~/types/api/bff/v1/products.types'

export type ProductWithVariants = MagentoProduct & {variants: MagentoProduct[]}

const MAGENTO_MEDIA_URL = 'https://magento.sandbox.epamdev.com/media/catalog/product/'

export const mapMagentoProducts = (magentoProducts: ProductWithVariants[]): Product[] => {
  return magentoProducts.map(mapMagentoProduct)
}

export const mapMagentoProduct = (magentoProduct: ProductWithVariants): Product => {
  const variants = magentoProduct.variants.map(mapProductVariant)
  return {
    id: magentoProduct?.id?.toString(),
    name: magentoProduct.name,
    description: magentoProduct?.custom_attributes?.find(
      attr => attr.attribute_code === 'description'
    )?.value,
    slug: magentoProduct?.custom_attributes?.find(
      attr => attr.attribute_code === 'url_key'
    )?.value,
    variants,
    masterVariant: variants[0]
  }
}

const mapProductVariant = (magentoProduct: MagentoProduct): ProductVariant => {
  return {
    id: magentoProduct?.id?.toString(),
    sku: magentoProduct.sku,
    prices: [
      { value: { currencyCode: 'USD', centAmount: magentoProduct?.price ? magentoProduct?.price * 100 : 0 } },
    ],
    images: [
      {
        url: MAGENTO_MEDIA_URL + magentoProduct?.custom_attributes?.find(
          attr => attr.attribute_code === 'image'
        )?.value,
      },
    ],
    attributes: [
      {
        color: magentoProduct?.custom_attributes?.find(
          attr => attr.attribute_code === 'color'
        )?.value,
        size: magentoProduct?.custom_attributes?.find(
          attr => attr.attribute_code === 'size'
        )?.value,
      },
    ],
    slug: magentoProduct.custom_attributes?.find(
      attr => attr.attribute_code === 'url_key'
    )?.value,
  }
}
