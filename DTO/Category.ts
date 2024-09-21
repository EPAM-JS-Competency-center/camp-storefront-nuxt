import type { Category } from '~/types/interfaces'

export default class CategoryDTO {
  id: string
  name: string
  slug: string
  description: string
  childCategories: string[]
  ancestors: CategoryDTO[]
  parent?: {
    id: string
    name: string
  } | null

  constructor(category: Category, categories: Category[] = []) {
    this.id = category.id || ''
    this.name = category.name || ''
    this.slug = category.slug || ''
    this.description = category.description || ''
    this.ancestors =
      (category.ancestors && category.ancestors.map((ancestor) => {
        return new CategoryDTO(categories.find(category => category.id === ancestor.id) as Category, categories)
      })) || []

    const parentCategory = categories.find(cat => cat.id === category.parent?.id)
    this.parent = parentCategory ? { id: String(parentCategory.id), name: String(parentCategory.name) } : null

    this.childCategories = categories.reduce((acc, categoryToReduce) => {
      if (categoryToReduce.parent?.id === category.id && categoryToReduce.id) {
        acc.push(categoryToReduce.id)
      }
      return acc
    }, [] as string[])

    // works as expected, suits to make an array of categories
    // id: string
    // name: string
    // slug: string
    // description: string
    // childCategories: string[]
    // ancestors: CategoryDTO[]
    // parent: string | null
    //
    // constructor(category: Category, categories: Category[] = []) {
    //   this.id = category.id || ''
    //   this.name = category.name || ''
    //   this.slug = category.slug || ''
    //   this.description = category.description || ''
    //   this.ancestors =
    //     (category.ancestors && category.ancestors.map((ancestor) => new CategoryDTO(ancestor))) || []
    //   this.parent = category.parent?.id ?? null
    //
    //   this.childCategories = categories.reduce((acc, categoryToReduce) => {
    //     if (categoryToReduce.parent?.id === category.id && categoryToReduce.id) {
    //       acc.push(categoryToReduce.id)
    //     }
    //     return acc
    //   }, [] as string[])
    // }
  }
}
