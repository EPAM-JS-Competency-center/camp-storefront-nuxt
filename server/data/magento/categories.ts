import type { MagentoCategory } from '~/types/api/data/magento/categories.types'
import { magentoFetch } from '~/server/data/magento/fetch'

export const getMagentoCategories = () => magentoFetch<MagentoCategory>('/V1/categories?rootCategoryId=2', { method: 'GET' })
