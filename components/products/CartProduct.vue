<template>
  <div v-if="lineItem.variant"
    class="flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] max-w-[640px] p-4">
    <div class="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
      <SfLink href="#">
        <img class="w-full h-auto border rounded-md border-neutral-200"
          :src="lineItem.variant && lineItem.variant.images && lineItem.variant.images[0] && lineItem.variant.images[0].url"
          :alt="lineItem.variant.name" width="176" height="176" />
      </SfLink>
    </div>
    <div class="flex flex-col pl-4 min-w-[180px] flex-1">
      <SfLink href="#" variant="secondary" class="no-underline typography-text-sm sm:typography-text-lg">
        {{ lineItem.variant.name }}
      </SfLink>
      <div class="my-2 sm:mb-0">
        <ul class="font-normal leading-5 typography-text-xs sm:typography-text-sm text-neutral-700">
          <li>
            <span class="mr-1">Size:</span>
            <span class="font-medium">
              {{ sizeName }}
            </span>
          </li>
          <li>
            <span class="mr-1">Color:</span>
            <span class="font-medium">
              {{ colorName }}
            </span>
          </li>
        </ul>
      </div>
      <div class="items-center sm:mt-auto sm:flex">
        <span class="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
          <span :class="{ 'line-through text-sm': totalDiscountValue > 0 }">
            {{ formatCurrency(originalPriceValue, currency) }}
          </span>
          <span v-if="totalDiscountValue > 0" class="ms-2 text-primary-700">
            {{ formatCurrency(originalPriceValue - totalDiscountValue, currency) }}
          </span>
        </span>
        <div class="flex items-center justify-between mt-4 sm:mt-0">
          <div class="flex border border-neutral-300 rounded-md">
            <SfButton variant="tertiary" :disabled="count <= min" square class="rounded-r-none" :aria-controls="inputId"
              aria-label="Decrease value" @click="() => {
                dec()
                updateQuantity(count)
              }">
              <SfIconRemove />
            </SfButton>
            <input :id="inputId" v-model="count" type="number"
              class="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
              :min="min" :max="max" @input="handleOnChange" />
            <SfButton variant="tertiary" :disabled="count >= max" square class="rounded-l-none" :aria-controls="inputId"
              aria-label="Increase value" @click="() => {
                inc()
                updateQuantity(count)
              }">
              <SfIconAdd />
            </SfButton>
          </div>
          <button aria-label="Remove" type="button"
            class="text-neutral-500 typography-text-xs font-light ml-auto flex items-center px-3 py-1.5"
            @click="removeItem">
            <SfIconDelete />
            <span class="hidden ml-1.5 sm:block"> Remove </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  SfLink,
  SfButton,
  SfIconAdd,
  SfIconRemove,
  SfIconDelete,
  useId,
} from '@storefront-ui/vue'
import { clamp } from '@storefront-ui/shared'
import { useCounter } from '@vueuse/core'
import type { CartLineItemsInner, ProductAttribute } from '~/types/interfaces'
import { useCartStore, useAlertsStore } from '@/stores'
import { formatCurrency } from '@/utils/helpers'
import { ALERT_TYPE } from '~/types/enums'

const props = defineProps<{
  lineItem: CartLineItemsInner
}>()

const cartStore = useCartStore()
const alerts = useAlertsStore()

const sizeName = computed(() => {
  const sizeAtribute = props.lineItem.variant?.attributes &&
    props.lineItem.variant?.attributes.find((option: ProductAttribute) => option.name === 'Size')

  return sizeAtribute?.value?.label || 'unknown'
})

const colorName = computed(() => {
  const sizeAtribute = props.lineItem.variant?.attributes &&
    props.lineItem.variant?.attributes.find((option: ProductAttribute) => option.name === 'Color')

  return sizeAtribute?.value?.label || 'unknown'
})

// Price and discount
const originalPriceValue = computed(() => {
  const prices = props.lineItem.variant?.prices

  let priceValue = 0

  if (prices && prices.length) {
    const quantity = props.lineItem.quantity || 1

    priceValue = ((prices[0].value?.centAmount || 0) * quantity)
  }

  return priceValue
})

const totalDiscountValue = computed(() => {
  if (!props.lineItem.discountedPricePerQuantity?.length) {
    return 0
  }

  return props.lineItem.discountedPricePerQuantity.reduce(
    (acc, discountItem) => {
      const discountAmount =
        discountItem.discountedPrice?.includedDiscounts?.reduce(
          (sum, discount) => sum + (discount.discountedAmount?.centAmount || 0),
          0
        ) || 0
      return acc + discountAmount
    },
    0
  )
})

const currency = computed(() => props.lineItem.currencyCode)

const min = ref(1)
const max = ref(10)
const inputId = useId()
const { count, inc, dec, set } = useCounter(
  props.lineItem.quantity || 1,
  { min: min.value, max: max.value }
)
function handleOnChange(event: Event) {
  const currentValue = (event.target as HTMLInputElement)?.value
  const nextValue = parseFloat(currentValue)

  set(clamp(nextValue, min.value, max.value))

  updateQuantity(count.value)
}

async function updateQuantity(newValue: number) {
  await cartStore.updateQuantity(props.lineItem, newValue)
  alerts.addAlert({ message: 'Product quantity updated', type: ALERT_TYPE.SUCCESS })
}

async function removeItem() {
  await cartStore.removeLineItem(props.lineItem)
  alerts.addAlert({ message: 'Product removed', type: ALERT_TYPE.SUCCESS })
}
</script>
