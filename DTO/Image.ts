import type { Image } from '~/types/interfaces'

export default class ImageDTO {
  label: string
  url: string

  constructor(image: Image) {
    this.label = image.label || ''
    this.url = image.url || ''
  }
}
