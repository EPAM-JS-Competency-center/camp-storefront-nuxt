import type { Category } from '~/types/interfaces'

export default class CategoryDTO {
  id: string
  name: string
  slug: string
  description: string
  childCategories: string[]
  ancestors: CategoryDTO[]
  parent: string | null

  constructor(category: Category, categories: Category[] = []) {
    this.id = category.id || ''
    this.name = category.name || ''
    this.slug = category.slug || ''
    this.description = category.description || ''
    this.ancestors =
      (category.ancestors && category.ancestors.map((ancestor) => {
        return new CategoryDTO(categories.find(category => category.id === ancestor.id) as Category, categories)
      })) || []
    this.parent = category.parent?.id ?? null

    this.childCategories = categories.reduce((acc, categoryToReduce) => {
      if (categoryToReduce.parent?.id === category.id && categoryToReduce.id) {
        acc.push(categoryToReduce.id)
      }
      return acc
    }, [] as string[])
  }
}
