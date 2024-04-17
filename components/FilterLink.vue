<template>
  <NuxtLink :to="href"
    >
<span
      class="inline-flex items-center gap-2 w-full hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:relative focus-visible:z-10 p-4 md:sf-list-item-sm md:py-1.5 sf-list-item"
      ><span class="flex flex-col w-full min-w-0"
        ><span class="flex gap-2 items-center"
          ><span class="text-base md:text-sm capitalize flex items-center">{{ title }}</span>
          <SfCounter v-if="count">{{ count }}</SfCounter>
        </span></span
      ></span
    >
</NuxtLink
  >
</template>

<script setup lang="ts">
  import { SfCounter } from '@storefront-ui/vue'

  defineProps<{
    href: string
    title: string
    count?: number
  }>()
</script>

<style scoped lang="scss"></style>
