import { H3Event } from 'h3'
import { getCategories } from '~/server/app/v1/categories/categories.service'

export const listCategories = async (event: H3Event) => {
  try {
    return await getCategories()
  } catch (error) {
    console.error('[error]', error)
  }
}
