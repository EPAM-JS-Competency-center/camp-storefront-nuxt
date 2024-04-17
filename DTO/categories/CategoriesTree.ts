// import type { Category } from '~/types/interfaces'
// import AncestorDTO from '~/DTO/categories/Ancestor'
// import ChildCategoryDTO from '~/DTO/categories/ChildCategory'
//
// export default class CategoriesTreeDTO {
//   id: string
//   name: string
//   slug: string
//   description: string
//   childCategories: ChildCategoryDTO[]
//   path: string
//
//   constructor(categories: Category[]) {
//     const mainCategory = categories.find(category => !category.parent) || {}
//
//     this.id = mainCategory.id || ''
//     this.name = mainCategory.name || ''
//     this.slug = mainCategory.slug || ''
//     this.description = mainCategory.description || ''
//     this.path = mainCategory.slug ? `/${mainCategory.slug}` : '/'
//
//     this.childCategories = categories
//       .filter(category => category.parent?.id === mainCategory.id)
//       .map(category => new ChildCategoryDTO(category, categories))
//   }
// }
