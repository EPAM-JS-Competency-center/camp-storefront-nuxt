import type {Category} from '~/types/api/bff/v1/categories.types'

export default class CategoryTree {
  id: string
  name: string
  description: string
  parent?: CategoryTree | null
  children?: CategoryTree[]
  path: string

  constructor(category: Category, parent?: CategoryTree) {
    this.id = String(category.id) || ''
    this.name = category.name || ''
    this.description = category.description || ''
    this.parent = parent
    this.path = parent ? `${parent.path}/${this.id}` : '/category'
    this.children = category.children?.map(category => new CategoryTree(category, this))
  }
}
