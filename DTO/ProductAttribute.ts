import type { ProductAttribute } from '~/types/interfaces'

export default class ProductAttributeDTO {
  name: string
  key: string
  label: string

  constructor(attribute: ProductAttribute) {
    this.name = attribute.name || ''
    this.key = attribute.value?.key || ''
    this.label = attribute.value?.label || ''
  }
}
