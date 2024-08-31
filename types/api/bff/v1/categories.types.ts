export type Category = {
  id: number
  name?: string
  slug?: string
  description?: string
  parent?: Category | null
  children?: Category[]
}