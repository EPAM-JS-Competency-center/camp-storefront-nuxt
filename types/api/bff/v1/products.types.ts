import type { Category } from '~/types/api/bff/v1/categories.types'

export type ProductsResponse = {
  limit?: number
  offset?: number
  total?: number
  results?: Product[]
}

export type Product = {
  id?: string
  name?: string
  description?: string
  slug?: string
  categories?: Category[]
  variants?: ProductVariant[]
  masterVariant?: ProductVariant
}

export type ProductVariant = {
  id?: string
  sku?: string
  name?: string
  slug?: string
  images?: Image[]
  prices?: Price[]
  attributes?: ProductAttribute[]
  availability?: ProductVariantAvailability
}

export type Image = {
  url?: string
  label?: string
}

export type Price = {
  id?: string
  value?: PriceValue
}

export type PriceValue = {
  currencyCode?: string
  centAmount?: number
}

export type ProductAttribute = {
  name?: string
  color?: string
  size?: string
  value?: {
    key?: string
    label?: string
  }
}

export type ProductVariantAvailability = {
  isOnStock?: boolean
  availableQty?: number
}





