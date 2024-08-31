<template>
  <aside class="w-full md:max-w-[376px]">
    <div v-if="productStore.selectedCategory">
      <Breadcrumbs :selected-category="productStore.selectedCategory" />
    </div>
    <div class="px-2"
      :class="{'pending-implementation': categoriesMocked}"
    >
      <BaseLoader v-show="isLoading" class="col-span-full" />
      <ul v-if="!isLoading && selectedCategory" class="mt-2 mb-6">
        <li
          v-for="(childCategory, index) in selectedCategory.children"
          :key="childCategory.id"
        >
          <NuxtLink :to="childCategory.path" @click="selectCategory(childCategory)">
            <SfListItem
              size="sm"
              tag="div"
              class="first-of-type:mt-2 rounded-md active:bg-primary-100"
            >
              <template #suffix>
                <SfIconCheck v-if="index === 0" size="xs" class="text-primary-700" />
              </template>
              <span class="flex items-center">
                {{ childCategory.name }}
              </span>
            </SfListItem>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <h5
      class="py-2 px-4 mb-6 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md"
    >
      Sort by
    </h5>
    <div class="px-2">
      <SfSelect v-model="sortModel" aria-label="Sort by">
        <option v-for="{ id, label, value } in sortOptions" :key="id" :value="value">
          {{ label }}
        </option>
      </SfSelect>
    </div>

    <h5
      class="py-2 px-4 mt-6 mb-4 bg-neutral-100 typography-headline-6 font-bold text-neutral-900 uppercase tracking-widest md:rounded-md"
    >
      Filters
    </h5>
    <ul class="flex flex-col gap-2">
      <!-- prettier-ignore-attribute -->
      <li
        v-for="({ id: filterDataId, type, summary, details }, index) in filtersData"
        :key="filterDataId"
      >
        <SfAccordionItem v-model="opened[index]">
          <template #summary>
            <div
              class="md:rounded-md w-full hover:bg-neutral-100 py-2 pl-4 pr-3 flex justify-between items-center py-4 md:py-2 list-none [&::-webkit-details-marker]:hidden cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:outline focus-visible:rounded-sm"
            >
              <p class="font-medium text-base capitalize">
                {{ summary }}
              </p>
              <SfIconChevronLeft :class="opened[index] ? 'rotate-90' : '-rotate-90'" />
            </div>
          </template>
          <ul v-if="type === 'size'" class="grid grid-cols-5 gap-2 py-2">
            <li v-for="{ id, value, counter, label } in details" :key="id">
              <SfChip
                v-model="selectedFilters"
                class="w-full"
                size="sm"
                :input-props="{ value, disabled: !counter }"
              >
                {{ label }}
              </SfChip>
            </li>
          </ul>
          <template v-if="type === 'color'">
            <SfListItem
              v-for="{ id, value, label, counter } in details"
              :key="id"
              size="sm"
              tag="label"
              :class="[
                'px-1.5 bg-transparent hover:bg-transparent',
                { 'font-medium': isItemActive(value) },
              ]"
              :selected="isItemActive(value)"
            >
              <template #prefix>
                <input
                  v-model="selectedFilters"
                  :value="value"
                  class="appearance-none peer"
                  type="checkbox"
                />
                <span
                  class="inline-flex items-center justify-center p-1 transition duration-300 rounded-full cursor-pointer ring-1 ring-neutral-200 ring-inset outline-offset-2 outline-secondary-600 peer-checked:ring-2 peer-checked:ring-primary-700 peer-hover:bg-primary-100 peer-[&:not(:checked):hover]:ring-primary-200 peer-active:bg-primary-200 peer-active:ring-primary-300 peer-disabled:cursor-not-allowed peer-disabled:bg-disabled-100 peer-disabled:opacity-50 peer-disabled:ring-1 peer-disabled:ring-disabled-200 peer-disabled:hover:ring-disabled-200 peer-checked:hover:ring-primary-700 peer-checked:active:ring-primary-700 peer-focus-visible:outline"
                  ><SfThumbnail size="sm" :class="value"
                /></span>
              </template>
              <p>
                <span class="mr-2 typography-text-sm">{{ label }}</span>
                <SfCounter size="sm">
                  {{ counter }}
                </SfCounter>
              </p>
            </SfListItem>
          </template>
        </SfAccordionItem>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import {
    SfAccordionItem,
    SfChip,
    SfCounter,
    SfIconChevronLeft,
    SfIconCheck,
    SfListItem,
    SfSelect,
    SfThumbnail,
  } from '@storefront-ui/vue'
  import { useProductStore } from '@/stores'
  import type CategoryTree from '~/DTO/categories/CategoriesTree'

  defineProps<{
    isLoading: boolean
  }>()

  type FilterDetail = {
    id: string
    label: string
    value: string
    counter?: number
    link?: string
  }

  type Node = {
    id: string
    summary: string
    type: string
    details: FilterDetail[]
  }

  const productStore = useProductStore()

  const selectedCategory = computed(() => productStore.selectedCategory)

  // This is to indicate if categories data source is still using mocked data
  const categoriesMocked = computed(() => productStore.categoriesMocked)

  const selectCategory = (category: CategoryTree) => {
    productStore.selectedCategory = category
  }

  const filtersData = ref<Node[]>([
    {
      id: 'acc1',
      summary: 'Size',
      type: 'size',
      details: [
        { id: 's1', label: '6', value: '6', counter: 10 },
        { id: 's2', label: '6.5', value: '6.5', counter: 10 },
        { id: 's3', label: '7', value: '7.5', counter: 30 },
        { id: 's4', label: '8', value: '8', counter: 0 },
        { id: 's5', label: '8.5', value: '8.5', counter: 3 },
        { id: 's6', label: '9', value: '9', counter: 7 },
        { id: 's7', label: '9.5', value: '9.5', counter: 9 },
        { id: 's8', label: '10', value: '10', counter: 11 },
        { id: 's9', label: '10.5', value: '10.5', counter: 12 },
        { id: 's10', label: '11', value: '11', counter: 0 },
        { id: 's11', label: '11.5', value: '11.5', counter: 4 },
        { id: 's12', label: '12', value: '12', counter: 1 },
      ],
    },
    {
      id: 'acc3',
      summary: 'Color',
      type: 'color',
      details: [
        {
          id: 'c1',
          label: 'Primary',
          value: 'bg-primary-500',
          counter: 10,
        },
        {
          id: 'c2',
          label: 'Black and gray',
          value: 'bg-[linear-gradient(-45deg,#000_50%,#d1d5db_50%)]',
          counter: 5,
        },
        {
          id: 'c3',
          label: 'Violet',
          value: 'bg-violet-500',
          counter: 0,
        },
        {
          id: 'c4',
          label: 'Red',
          value: 'bg-red-500',
          counter: 2,
        },
        {
          id: 'c5',
          label: 'Yellow',
          value: 'bg-yellow-500',
          counter: 100,
        },
        {
          id: 'c6',
          label: 'Avocado',
          value: 'bg-gradient-to-tr from-yellow-300 to-primary-500',
          counter: 14,
        },
      ],
    },
  ])
  const sortOptions = ref([
    { id: 'sort1', label: 'Relevance', value: 'relevance' },
    { id: 'sort2', label: 'Price: Low to High', value: 'price low to high' },
    { id: 'sort3', label: 'Price: High to Low', value: 'price high to low' },
    { id: 'sort4', label: 'New Arrivals', value: 'new arrivals' },
    { id: 'sort5', label: 'Customer Rating', value: 'customer rating' },
    { id: 'sort6', label: 'Bestsellers', value: 'bestsellers' },
  ])

  const selectedFilters = ref<string[]>([])
  const opened = ref<boolean[]>(filtersData.value.map(() => true))
  const sortModel = ref()

  const isItemActive = (selectedValue: string) => {
    return selectedFilters.value?.includes(selectedValue)
  }
</script>
