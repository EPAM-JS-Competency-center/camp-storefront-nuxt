<template>
  <div class="max-w-screen-3xl mx-auto md:px-6 lg:px-10">
    <div class="px-4 md:px-0 mb-20">
      <div class="flex justify-between mt-8 mb-10">
        <h1 class="typography-headline-3 md:typography-headline-2 font-bold">
          My Cart
        </h1>
        <a class="inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed leading-5 text-sm py-1.5 px-3 gap-1.5 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 disabled:bg-transparent flex md:hidden whitespace-nowrap"
          href="/category"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            class="inline-block fill-current w-6 h-6 undefined">
            <path
              d="m10.875 19.3-6.6-6.6a.883.883 0 0 1-.213-.325A1.115 1.115 0 0 1 4 12c0-.133.02-.258.062-.375a.883.883 0 0 1 .213-.325l6.6-6.6a.978.978 0 0 1 .687-.288.933.933 0 0 1 .713.288c.2.183.304.412.313.687a.933.933 0 0 1-.288.713L7.4 11h11.175a.97.97 0 0 1 .713.287.97.97 0 0 1 .287.713.97.97 0 0 1-.287.712.968.968 0 0 1-.713.288H7.4l4.9 4.9c.183.183.28.417.288.7a.872.872 0 0 1-.288.7c-.183.2-.417.3-.7.3a.988.988 0 0 1-.725-.3Z">
            </path>
          </svg>Back To Shopping</a>
        <a class="inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed py-2 leading-6 px-4 gap-2 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 disabled:bg-transparent hidden md:flex"
          href="/category"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            class="inline-block fill-current w-6 h-6 undefined">
            <path
              d="m10.875 19.3-6.6-6.6a.883.883 0 0 1-.213-.325A1.115 1.115 0 0 1 4 12c0-.133.02-.258.062-.375a.883.883 0 0 1 .213-.325l6.6-6.6a.978.978 0 0 1 .687-.288.933.933 0 0 1 .713.288c.2.183.304.412.313.687a.933.933 0 0 1-.288.713L7.4 11h11.175a.97.97 0 0 1 .713.287.97.97 0 0 1 .287.713.97.97 0 0 1-.287.712.968.968 0 0 1-.713.288H7.4l4.9 4.9c.183.183.28.417.288.7a.872.872 0 0 1-.288.7c-.183.2-.417.3-.7.3a.988.988 0 0 1-.725-.3Z">
            </path>
          </svg>Back To Shopping</a>
      </div>
      <div v-if="cart.lineItems && cart.lineItems.length"
        :class="{ 'pending-implementation': cart.id === 'mocked-cart-id' }"
        class="max-w-screen-3xl mx-auto md:px-6 lg:px-10">
        <div class="md:grid md:grid-cols-12 md:gap-x-6">
          <div class="col-span-7 mb-10 md:mb-0">
            <CartProduct v-for="(item, index) in cart.lineItems" :key="index" :line-item="item" />
          </div>

          <CartSummary :cart="cart" />
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center">
        <img src="/assets/images/empty-cart.svg" alt="Empty Cart" class="w-1/3 md:w-1/5" />
        <div class="typography-body-1 text-3xl">
          Your cart is empty
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartProduct from '~/components/products/CartProduct.vue'
import CartSummary from '~/components/CartSummary.vue'
import { useCart } from '@/stores'

const cartStore = useCart()

const cart = computed(() => cartStore.cart)

onBeforeMount(async () => {
  await cartStore.loadCart()
})

definePageMeta({
  layout: 'checkout',
})
</script>
