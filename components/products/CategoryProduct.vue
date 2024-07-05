<template>
  <div class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
    <div class="relative">
      <SfLink :href="productLink" class="block">
        <img
          :src="product.masterVariant.mainImage"
          alt="Great product"
          class="block object-cover h-auto rounded-md aspect-square"
          width="300"
          height="300"
        />
      </SfLink>
      <SfButton
        variant="tertiary"
        size="sm"
        square
        class="absolute bottom-0 right-0 mr-2 mb-2 bg-white ring-1 ring-inset ring-neutral-200 !rounded-full"
        aria-label="Add to wishlist"
      >
        <SfIconFavorite />
      </SfButton>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <SfLink :href="productLink" variant="secondary" class="no-underline">
        {{ product.name }}
      </SfLink>
      <div class="flex items-center pt-1">
        <SfRating size="xs" class="text-warning-500" :value="3" :max="5" />

        <SfLink :href="productLink" variant="secondary" class="pl-1 no-underline">
          <SfCounter size="xs">
123
</SfCounter>
        </SfLink>
      </div>
      <span v-if="product.masterVariant" class="block pb-2 font-bold typography-text-lg">{{
        formatCurrency(
          product.masterVariant.price.centAmount,
          product.masterVariant.price.currencyCode
        )
      }}</span>
      <SfButton size="sm" @click="addToCart">
        <template #prefix>
          <SfIconShoppingCart />
        </template>
        Add to cart
      </SfButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    SfRating,
    SfCounter,
    SfLink,
    SfButton,
    SfIconShoppingCart,
    SfIconFavorite,
  } from '@storefront-ui/vue'
  import { formatCurrency } from '~/utils/helpers'
  import ProductDTO from '~/DTO/Product'
  import { useCartStore, useAlertsStore } from '~/stores'
  import { ALERT_TYPE } from '~/types/enums'

  const props = defineProps<{ product: ProductDTO }>()

  const productLink = computed(() => `/products/${props.product.masterVariant.sku}`)

  const { addAlert } = useAlertsStore()
  const cartStore = useCartStore()

  async function addToCart() {
    await cartStore.addProductToCart(props.product.masterVariant.sku, 1)
    addAlert({ message: 'Product added to cart', type: ALERT_TYPE.SUCCESS })
  }
</script>
