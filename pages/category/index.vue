<template>
  <div class="max-w-screen-3xl mx-auto md:px-6 lg:px-10">
    <div class="mb-20 px-4 md:px-0">
      <h1 class="typography-headline-3 md:typography-headline-2 font-bold mt-4 mb-10">
        All products
      </h1>
      <div class="md:flex gap-6">
        <CategoryFilters :is-loading="states.isLoadingCategories" />

        <div class="flex-1" :class="{ 'pending-implementation': areProductsMocked }">
          <div class="flex justify-between items-center mb-6">
            <span class="font-bold font-headings md:text-lg">{{ total }} Products</span
            ><button
              type="button"
              class="inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed py-2 leading-6 px-4 gap-2 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 disabled:bg-transparent md:hidden whitespace-nowrap"
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="inline-block fill-current w-6 h-6 undefined"
              >
                <path
                  d="M4 19a.965.965 0 0 1-.712-.288A.965.965 0 0 1 3 18c0-.283.096-.52.288-.712A.965.965 0 0 1 4 17h4c.283 0 .521.096.713.288A.967.967 0 0 1 9 18a.97.97 0 0 1-.287.712A.968.968 0 0 1 8 19H4ZM4 7a.967.967 0 0 1-.712-.287A.968.968 0 0 1 3 6c0-.283.096-.521.288-.713A.967.967 0 0 1 4 5h8a.97.97 0 0 1 .713.287A.97.97 0 0 1 13 6a.97.97 0 0 1-.287.713A.97.97 0 0 1 12 7H4Zm8 14a.965.965 0 0 1-.712-.288A.965.965 0 0 1 11 20v-4c0-.283.096-.521.288-.713A.967.967 0 0 1 12 15a.97.97 0 0 1 .713.287A.97.97 0 0 1 13 16v1h7c.283 0 .52.096.712.288A.965.965 0 0 1 21 18c0 .283-.096.52-.288.712A.965.965 0 0 1 20 19h-7v1a.97.97 0 0 1-.287.712A.968.968 0 0 1 12 21Zm-4-6a.968.968 0 0 1-.713-.288A.967.967 0 0 1 7 14v-1H4a.965.965 0 0 1-.712-.288A.965.965 0 0 1 3 12c0-.283.096-.521.288-.713A.967.967 0 0 1 4 11h3v-1a.97.97 0 0 1 .287-.713A.97.97 0 0 1 8 9a.97.97 0 0 1 .713.287A.97.97 0 0 1 9 10v4a.97.97 0 0 1-.287.712A.968.968 0 0 1 8 15Zm4-2a.965.965 0 0 1-.712-.288A.965.965 0 0 1 11 12c0-.283.096-.521.288-.713A.967.967 0 0 1 12 11h8a.97.97 0 0 1 .712.287c.192.192.288.43.288.713s-.096.52-.288.712A.965.965 0 0 1 20 13h-8Zm4-4a.965.965 0 0 1-.712-.288A.965.965 0 0 1 15 8V4c0-.283.096-.521.288-.713A.967.967 0 0 1 16 3a.97.97 0 0 1 .712.287c.192.192.288.43.288.713v1h3a.97.97 0 0 1 .712.287c.192.192.288.43.288.713a.968.968 0 0 1-.288.713A.967.967 0 0 1 20 7h-3v1c0 .283-.096.52-.288.712A.965.965 0 0 1 16 9Z"
                ></path></svg
              >List settings
            </button>
          </div>
          <section
            class="grid grid-cols-1 2xs:grid-cols-2 gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 mb-10 md:mb-5"
          >
            <BaseLoader v-show="states.isLoadingProducts" class="col-span-full" />
            <p v-show="!states.isLoadingProducts && !products.length" class="col-span-full mx-auto">
              Nothing to show
            </p>
            <template v-if="!states.isLoadingProducts && products.length">
              <CategoryProduct v-for="product in products" :key="product.id" :product="product" />
            </template>
          </section>
          <AppPagination
            v-if="!states.isLoadingProducts || total"
            :current-page="($route.query.page as string) || START_PAGE_NUMBER"
            :page-size="MAX_PAGE_PRODUCTS_COUNT"
            :total-items="total || MAX_PAGE_PRODUCTS_COUNT"
            @select-page="getProducts(selectedCategory?.id, $event)"
            @next-page="getProducts(selectedCategory?.id, $event)"
            @previous-page="getProducts(selectedCategory?.id, $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CategoryProduct from '~/components/products/CategoryProduct.vue'
  import ProductDTO from '~/DTO/Product'
  import { START_PAGE_NUMBER } from '~/utils/constants'

  const route = useRoute()

  const productStore = useProductStore()

  const products = computed<ProductDTO[]>(() => productStore.productsInfo.products)

  const selectedCategory = computed(() => productStore.selectedCategory)

  const total = computed(() => productStore.productsInfo.total || 0)

  // This is to indicate if products are using mocked data
  const areProductsMocked = computed(() => productStore.productsMocked)

  const states = reactive({
    isLoadingProducts: false,
    isLoadingCategories: false,
  })

  onBeforeMount(async () => {
    states.isLoadingProducts = true

    if (!productStore.categoriesTree) {
      states.isLoadingCategories = true
      await productStore.getCategories()
      states.isLoadingCategories = false
    }

    const defaultCategoryId = productStore.defaultCategoryId
    productStore.selectedCategory = productStore.categoriesTree

    await productStore.getCategoryProducts(
      selectedCategory.value?.id || defaultCategoryId,
      (route.query.page as string) || undefined,
    )

    states.isLoadingProducts = false
  })

  const getProducts = async (categoryID?: string | number, page?: number | string) => {
    states.isLoadingProducts = true
    await productStore.getCategoryProducts(categoryID, page)
    states.isLoadingProducts = false
  }
</script>
