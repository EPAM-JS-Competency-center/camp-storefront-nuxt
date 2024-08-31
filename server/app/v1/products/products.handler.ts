import { H3Event } from 'h3'
import { getProductsByCategory } from '~/server/app/v1/products/products.service'

export const listProducts = async (event: H3Event) => {
  const { limit, offset, categoryId } = getQuery(event)

  try {
    return await getProductsByCategory(limit as number, offset as number, categoryId as string)
  } catch (error) {
    console.error('[error]', error)
  }
}
