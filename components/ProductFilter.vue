<template>
  <div class="w-full mb-6 last:mb-0">
    <span
      class="bg-neutral-100 md:rounded-md px-4 py-2 text-sm font-bold font-headings mb-2 tracking-widest uppercase block"
      >{{ title.toUpperCase() }}</span
    >
    <div class="mt-4 md:mt-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
  }>()
</script>
