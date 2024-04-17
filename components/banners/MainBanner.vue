<template>
  <section class="min-h-[600px] max-w-screen-3xl mx-auto mb-10 grid md:grid-cols-2">
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
          border: 0px;
          margin: 0px;
          padding: 78.534% 0px 0px;
        "
      ></span
      ><img
        alt="hero placeholder"
        crossorigin="anonymous"
        sizes="(max-width: 767px) 90vw, (max-width: 1365px) 50vw, 764px"
        src="~/assets/images/shoe-main-banner.avif"
        decoding="async"
        data-nimg="responsive"
        class="object-contain"
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
    <div class="flex flex-col justify-center items-start p-4 md:p-10 md:row-start-1">
      <p class="mb-2 uppercase text-sm text-neutral-900 font-headings font-bold tracking-widest">
        SPECIAL OFFER
      </p>
      <h1 class="typography-headline-3 md:typography-headline-2 font-medium mb-4">
        Sneaker hot drops
      </h1>
      <p class="mb-6">
        This fashionable sneaker collection features various colors, comfort and style.
      </p>
      <SfButtonLink href="/category">
Browse deals
</SfButtonLink>
    </div>
  </section>
</template>
<script setup lang="ts">
  import SfButtonLink from '~/components/base/SfButtonLink.vue'
</script>
