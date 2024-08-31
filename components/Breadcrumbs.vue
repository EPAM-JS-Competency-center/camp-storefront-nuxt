<template>
  <nav class="inline-flex items-center text-sm font-normal font-body">
    <ol class="flex w-auto leading-none group md:flex-wrap">
      <li
        v-for="(item, index) in bc"
        :key="item.name"
        class="peer hidden sm:flex items-center peer-[:nth-of-type(odd)]:before:content-['/'] peer-[:nth-of-type(odd)]:before:px-2 peer-[:nth-of-type(odd)]:before:leading-5 last-of-type:flex last-of-type:before:font-normal last-of-type:before:text-neutral-500 text-neutral-500 last-of-type:text-neutral-900 last-of-type:font-medium"
      >
        <SfLink
          v-if="index < bc.length - 1"
          :href="item.link"
          variant="secondary"
          class="leading-5 no-underline hover:underline active:underline whitespace-nowrap outline-secondary-600 text-inherit"
        >
          {{ item.name }}
        </SfLink>
        <span v-else>
          {{ item.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
  import { SfLink } from '@storefront-ui/vue'
  import type CategoryTree from '~/DTO/categories/CategoriesTree'

  const props = defineProps<{
    selectedCategory: CategoryTree
  }>()

  const bc = computed(() => {
    const breadcrumbs = []

    let category: CategoryTree | null | undefined = props.selectedCategory
    while (category) {
      breadcrumbs.push({ name: category.name, link: category.path })
      category = category.parent
    }

    return breadcrumbs.reverse()
  })
</script>
