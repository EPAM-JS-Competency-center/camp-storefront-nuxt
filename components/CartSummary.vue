<template>
  <div class="col-span-5">
    <div class="md:shadow-lg md:rounded-md md:border md:border-neutral-100">
      <div class="flex justify-between items-end bg-neutral-100 md:bg-transparent py-2 px-4 md:px-6 md:pt-6 md:pb-4">
        <p class="typography-headline-4 font-bold md:typography-headline-3">
          Order Summary
        </p>
        <p class="typography-text-base font-medium">
          (Items: {{ orderDetails.items }})
        </p>
      </div>
      <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
        <div class="flex justify-between typography-text-base pb-4">
          <div class="flex flex-col grow pr-2">
            <p>Items Subtotal</p>
            <p class="typography-text-xs text-neutral-500">
              Original Price
            </p>
            <p class="my-2">
              Delivery
            </p>
            <p>Estimated Sales Tax</p>
          </div>
          <div class="flex flex-col text-right">
            <p>{{ formatPrice(itemsSubtotal) }}</p>
            <p class="typography-text-xs text-neutral-500">
              {{ formatPrice(orderDetails.originalPrice) }}
            </p>
            <p class="my-2">
              {{ formatPrice(orderDetails.delivery) }}
            </p>
            <p>{{ formatPrice(orderDetails.tax) }}</p>
          </div>
        </div>

        <div v-if="promoCode && showPromocode" class="flex items-center mb-5 py-5 border-y border-neutral-200">
          <p>PromoCode</p>
          <SfButton size="sm" variant="tertiary" class="ml-auto mr-2" @click="removePromoCode">
            Remove
          </SfButton>
          <p>{{ formatPrice(promoCode) }}</p>
        </div>
        <form v-if="!promoCode && showPromocode" class="flex gap-x-2 py-4 border-y border-neutral-200 mb-4" @submit.prevent="checkPromoCode">
          <SfInput v-model="inputValue" placeholder="Enter Promo Code" wrapper-class="grow" />
          <SfButton type="submit" variant="secondary">
            Apply
          </SfButton>
        </form>
        <div
          class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200">
          <p>Total</p>
          <p>{{ formatPrice(totalPrice) }}</p>
        </div>
        <SfButtonLink size="lg" class="w-full" href="/checkout">
          Go to Checkout
        </SfButtonLink>
      </div>
    </div>
    <div class="absolute top-0 right-0 mx-2 mt-2 sm:mr-6">
      <div v-if="showAddedCodeAlert" role="alert"
        class="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md">
        <SfIconCheckCircle class="mr-2 my-2 text-positive-700" />
        <p class="py-2 mr-2">
          Your promo code has been added.
        </p>
        <button type="button"
          class="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
          aria-label="Close positive alert" @click="showAddedCodeAlert = false">
          <SfIconClose class="hidden md:block" />
          <SfIconClose size="sm" class="md:hidden block" />
        </button>
      </div>
      <div v-if="showRemovedCodeAlert" role="alert"
        class="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md">
        <SfIconCheckCircle class="mr-2 my-2 text-positive-700" />
        <p class="py-2 mr-2">
          Your promo code has been removed.
        </p>
        <button type="button"
          class="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
          aria-label="Close positive alert" @click="showRemovedCodeAlert = false">
          <SfIconClose class="hidden md:block" />
          <SfIconClose size="sm" class="md:hidden block" />
        </button>
      </div>
      <div v-if="showErrorAlert" role="alert"
        class="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md">
        <p class="py-2 mr-2">
          This promo code is not valid.
        </p>
        <button type="button"
          class="p-1.5 md:p-2 ml-auto rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900"
          aria-label="Close error alert" @click="showErrorAlert = false">
          <SfIconClose class="hidden md:block" />
          <SfIconClose size="sm" class="md:hidden block" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { SfButton, SfInput, SfIconClose, SfIconCheckCircle } from '@storefront-ui/vue'
import type { Cart } from '~/types/interfaces'
import SfButtonLink from '~/components/base/SfButtonLink.vue'

const props = defineProps<{
  cart: Cart
}>()

const inputValue = ref('')
const showRemovedCodeAlert = ref(false)
const showAddedCodeAlert = ref(false)
const showErrorAlert = ref(false)

const showPromocode = ref(false)

const orderDetails = computed(() => ({
  items: props.cart.lineItems?.length || 0,
  originalPrice: (props.cart.totalPrice?.centAmount || 0) / 100,
  delivery: 0.0,
  tax: 0,
}))

const promoCode = ref(0)

const itemsSubtotal = computed(
  () => (props.cart.totalPrice?.centAmount || 0) / 100
)

const totalPrice = computed(() => itemsSubtotal.value + promoCode.value)

const checkPromoCode = () => {
  if (
    (promoCode.value === -100 && inputValue.value.toUpperCase() === 'VSF2020') ||
    !inputValue.value
  ) {
    return
  }
  if (inputValue.value.toUpperCase() === 'VSF2020') {
    promoCode.value = -100
    showAddedCodeAlert.value = true
    setTimeout(() => (showAddedCodeAlert.value = false), 5000)
  } else {
    showErrorAlert.value = true
    setTimeout(() => (showErrorAlert.value = false), 5000)
  }
}

const removePromoCode = () => {
  promoCode.value = 0
  showRemovedCodeAlert.value = true
  setTimeout(() => (showRemovedCodeAlert.value = false), 5000)
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(
    (new Intl.NumberFormat()).resolvedOptions().locale,
    { style: 'currency', currency: props.cart.totalPrice?.currencyCode || 'USD' }
  ).format(price)
}
</script>
