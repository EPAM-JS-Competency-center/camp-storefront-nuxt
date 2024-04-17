<template>
  <MainBanner />

  <HomePageCategories />

  <div class="max-w-screen-3xl mx-auto grid gap-4 md:gap-6 px-4 md:px-10 mb-10 md:grid-cols-2">
    <BigBanner
      class="md:first:col-span-2"
      title="Fresh and bold new stuff"
      bg-color="rgb(221, 214, 254)"
      :image-path="purpleBannerImage"
      description="Make your palette pop with our all-new Designer pieces"
      link-text="Discover now"
      label="NEW COLLECTION"
    />
    <SmallBanner
      class="md:first:col-span-2"
      title="Designer sunglasses"
      bg-color="rgb(254, 205, 211)"
      :image-path="pinkBannerImage"
      description="Explore our collection of designer shades."
      link-text="Discover now"
      label="BE INSPIRED"
    />
    <SmallBanner
      class="md:first:col-span-2"
      title="Gear up and get ready"
      bg-color="rgb(254, 240, 138)"
      :image-path="yellowBannerImage"
      description="Backpacks for everyday and long trips."
      link-text="Discover now"
      label="BE ACTIVE"
    />
  </div>

  <div class="max-w-screen-3xl mx-auto px-4 md:px-10 mb-20">
    <SfScrollable
      class="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] overflow-x-auto [scrollbar-width:none]"
    >
      <SmallProduct v-for="product in mockProducts" :key="product.uuid" :product="product" />
    </SfScrollable>
  </div>
</template>

<script setup lang="ts">
  import { SfScrollable } from '@storefront-ui/vue'
  import purpleBannerImage from '~/assets/images/purple-banner.avif'
  import pinkBannerImage from '~/assets/images/pink-banner.avif'
  import yellowBannerImage from '~/assets/images/yellow-banner.avif'
  import hatProductImage from '~/assets/images/hat.avif'
  import BigBanner from '~/components/banners/BigBanner.vue'
  import SmallBanner from '~/components/banners/SmallBanner.vue'
  import SmallProduct from '~/components/products/SmallProduct.vue'
  import type { IProduct } from '~/types/interfaces'
  import MainBanner from '~/components/banners/MainBanner.vue'
  import HomePageCategories from '~/components/HomePageCategories.vue'

  const mockProducts: IProduct[] = new Array(13).fill({}).map((_, index) => ({
    title: `Product title ${index}`,
    price: +(index * Math.random()).toFixed(2),
    imagePath: hatProductImage,
    uuid: `${(() => Math.random())()}`,
    score: 1,
  }))
</script>

<style scoped></style>
