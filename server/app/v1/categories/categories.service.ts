import { getMagentoCategories } from '~/server/data/magento/categories'
import { mapMagentoCategories } from '~/server/app/v1/categories/categories.mapper'
import type { Category } from '~/types/api/bff/v1/categories.types'

export const getCategories = async (): Promise<Category> => {
  const magentoCategories = await getMagentoCategories()

  return mapMagentoCategories(magentoCategories)
}
