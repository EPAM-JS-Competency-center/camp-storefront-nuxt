<template>
  <div :style="{ 'background-color': bgColor }">
    <div class="flex flex-col md:flex-column">
      <div class="flex flex-col basis-2/4">
        <div class="relative w-full pt-[100%]">
          <span
            style="
              box-sizing: border-box;
              display: block;
              overflow: hidden;
              width: initial;
              height: initial;
              background: none;
              opacity: 1;
              border: 0px;
              margin: 0px;
              padding: 0px;
              position: absolute;
              inset: 0px;
            "
            ><img
              alt="1x1 any 1"
              crossorigin="anonymous"
              :src="imagePath"
              decoding="async"
              data-nimg="fill"
              class="object-cover"
              sizes="(max-width: 767px) 90vw, (max-width: 1365px) 45vw, 728px"
              style="
                position: absolute;
                inset: 0px;
                box-sizing: border-box;
                padding: 0px;
                border: none;
                margin: auto;
                display: block;
                width: 0px;
                height: 0px;
                min-width: 100%;
                max-width: 100%;
                min-height: 100%;
                max-height: 100%;
              "
          /></span>
        </div>
      </div>
      <div
        class="flex flex-col justify-center items-start p-4 md:p-10 basis-2/4 items-center text-center"
      >
        <p class="mb-2 uppercase text-sm text-neutral-900 font-headings font-bold tracking-widest">
          {{ label }}
        </p>
        <h2 class="typography-headline-3 md:typography-headline-2 font-medium mb-4">
          {{ title }}
        </h2>
        <p class="mb-6">
{{ description }}
</p>

        <SfButtonLink
          class="active:shadow bg-primary-700 hover:bg-primary-800 active:bg-primary-900 grayscale"
          :href="linkPath"
        >
          {{ linkText }}
        </SfButtonLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SfButtonLink from '~/components/base/SfButtonLink.vue'

  withDefaults(
    defineProps<{
      label: string
      title: string
      description: string
      imagePath: string
      linkText: string
      linkPath?: string
      bgColor: string
    }>(),
    {
      linkPath: '/',
    },
  )
</script>

<style scoped lang="scss"></style>
