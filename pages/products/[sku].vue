<template>
  <div class="max-w-screen-3xl mx-auto md:px-6 md:pt-6 lg:px-10">
    <ProductDetails :is-loading="states.isLoading" />

    <div class="mx-4 mt-28 mb-20">
      <p class="my-4 text-lg font-headline-3">
        Recommended with this product
      </p>
      <SfScrollable
        class="items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] overflow-x-auto [scrollbar-width:none]"
      >
        <SmallProduct v-for="product in mockProducts" :key="product.uuid" :product="product" />
      </SfScrollable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SfScrollable } from '@storefront-ui/vue'
  import { useRoute } from 'vue-router'
  import SmallProduct from '~/components/products/SmallProduct.vue'
  import type { IProduct } from '~/types/interfaces'
  import hatProductImage from 'assets/images/hat.avif'
  import ProductDetails from '~/components/products/ProductDetails.vue'

  const route = useRoute()
  const productStore = useProductStore()

  const states = reactive({
    isLoading: false,
  })

  onBeforeMount(async () => {
    states.isLoading = true
    await productStore.getProduct(route.params.sku as string)
    states.isLoading = false
  })

  const mockProducts: IProduct[] = new Array(13).fill({}).map((_, index) => ({
    title: `Product title ${index}`,
    price: +(index * Math.random()).toFixed(2),
    imagePath: hatProductImage,
    uuid: `${(() => Math.random())()}`,
    score: 1,
  }))
</script>

<style scoped lang="scss"></style>
