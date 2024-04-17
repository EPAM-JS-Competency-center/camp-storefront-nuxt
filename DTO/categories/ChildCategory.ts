import type { Category } from '~/types/interfaces'
import AncestorDTO from '~/DTO/categories/Ancestor'

export default class CategoryDTO {
  id: string
  name: string
  slug: string
  description: string
  parent: AncestorDTO | null
  ancestors: AncestorDTO[]
  parentPath: string
  path: string
  // eslint-disable-next-line
  childCategories: CategoryDTO[]

  constructor(categories: Category[], childCategory?: Category) {
    const rawCategory = (childCategory ?? categories.find(category => !category.parent || String(category.parent.id) === '0')) || {}
    const ancestors = rawCategory.ancestors?.map((ancestor) => {
      return new AncestorDTO(categories.find(category => category.id === ancestor.id) as Category)
    }) || []
    const parentPath = ancestors.reduce((acc, ancestor) => {
      acc += `/${ancestor.slug}`

      return acc
    }, '')

    this.id = rawCategory.id || ''
    this.name = rawCategory.name || ''
    this.slug = rawCategory.slug || ''
    this.description = rawCategory.description || ''
    this.parent = rawCategory.ancestors?.length
      ? new AncestorDTO(rawCategory.ancestors.at(-1) as Category)
      : null
    this.ancestors = ancestors
    this.parentPath = parentPath || '/'
    this.path = parentPath ? parentPath + `/${rawCategory.slug}` : `/${rawCategory.slug}`

    this.childCategories = categories
      .filter(category => category.parent?.id === rawCategory.id)
      .map(category => new CategoryDTO(categories, category))
  }
}
