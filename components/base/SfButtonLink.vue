<template>
  <SfButton :tag="NuxtLink" :to="href">
    <template #prefix>
      <slot name="prefix" />
    </template>

    <slot />

    <template #suffix>
      <slot name="suffix" />
    </template>
  </SfButton>
</template>

<script setup lang="ts">
  import { SfButton } from '@storefront-ui/vue'

  defineProps<{
    href: string
  }>()

  const NuxtLink = resolveComponent('NuxtLink')
</script>
