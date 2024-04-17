import type { Category } from '~/types/interfaces'

export default class AncestorDTO {
  id: string
  name: string
  slug: string
  description: string
  parent: string | null

  constructor(ancestor: Category) {
    this.id = ancestor.id || ''
    this.name = ancestor.name || ''
    this.slug = ancestor.slug || ''
    this.description = ancestor.description || ''
    this.parent = ancestor.parent?.id ?? null
  }
}
