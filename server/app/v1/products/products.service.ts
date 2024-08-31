import { getMagentoProducts, getMagentoVariants } from '~/server/data/magento/products'
import type { ProductsResponse } from '~/types/api/bff/v1/products.types'
import { mapMagentoProducts } from '~/server/app/v1/products/products.mapper'

export const getProductsByCategory = async (limit: number, offset: number, categoryId: string): Promise<ProductsResponse> => {
  const magentoProductsResponse = await getMagentoProducts(limit, offset, categoryId)

  const variantIds = magentoProductsResponse.items.reduce<number[]>((ids, product) => {
    if (product?.extension_attributes?.configurable_product_links && product.extension_attributes.configurable_product_links.length > 0) {
      ids.push(...product.extension_attributes.configurable_product_links)
    }
    return ids
  }, [])

  const magentoVariantsResponse = await getMagentoVariants(variantIds as unknown as string[])

  const productsWithVariants = magentoProductsResponse.items.map((product) => {
    if (product?.extension_attributes?.configurable_product_links && product.extension_attributes.configurable_product_links.length > 0) {
      const productVariants = magentoVariantsResponse.items.filter(variant => product?.extension_attributes?.configurable_product_links?.includes(variant?.id))
      return { ...product, variants: productVariants }
    }
    return { ...product, variants: [] }
  })

  return {
    total: magentoProductsResponse.total_count,
    results: mapMagentoProducts(productsWithVariants)
  }
}
