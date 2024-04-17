<template>
  <div
    class="border border-neutral-200 rounded-md hover:shadow-lg flex flex-col w-[148px] md:w-[192px] shrink-0 self-stretch snap-center"
  >
    <div class="relative">
      <a href=""
        ><span
          style="
            box-sizing: border-box;
            display: block;
            overflow: hidden;
            width: initial;
            height: initial;
            background: none;
            opacity: 1;
            border: 0;
            margin: 0;
            padding: 0;
            position: relative;
          "
          ><span
            style="
              box-sizing: border-box;
              display: block;
              width: initial;
              height: initial;
              background: none;
              opacity: 1;
              border: 0;
              margin: 0;
              padding: 0;
              padding-top: 100%;
            "
          ></span
          ><img
            alt="Card image placeholder"
            crossorigin="anonymous"
            :src="product.imagePath"
            decoding="async"
            data-nimg="responsive"
            class="object-contain"
            style="
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              box-sizing: border-box;
              padding: 0;
              border: none;
              margin: auto;
              display: block;
              width: 0;
              height: 0;
              min-width: 100%;
              max-width: 100%;
              min-height: 100%;
              max-height: 100%;
            "
            sizes="100vw" /></span
      ></a>
    </div>
    <div class="p-2 md:p-4 border-t border-neutral-200 h-full flex flex-col text-neutral-900">
      <a
        class="focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm underline hover:text-primary-800 active:text-primary-900 text-sm text-inherit no-underline hover:underline hover:!text-primary-800 active:text-primary-900 visited:!text-inherit"
        href=""
        >{{ product.title }}</a
      >
      <span class="block font-bold text-sm text-neutral-900 mt-2">${{ product.price }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { IProduct } from '~/types/interfaces'

  defineProps<{ product: IProduct }>()
</script>
