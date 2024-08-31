import type { MagentoCategory } from '~/types/api/data/magento/categories.types'
import type { Category } from '~/types/api/bff/v1/categories.types'

export const mapMagentoCategories = (magentoCategory: MagentoCategory): Category => {
  const category: Category = {
    id: magentoCategory.id,
    name: magentoCategory.name,
    parent: magentoCategory.level !== 1
      ? { id: magentoCategory.parent_id }
      : null,
  }

  if (magentoCategory.children_data.length === 0) {
    category.children = []
    return category
  }

  category.children = magentoCategory.children_data.map(category => mapMagentoCategories(category))

  return category
}
