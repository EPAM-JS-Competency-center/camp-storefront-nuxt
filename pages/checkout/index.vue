<template>
  <div class="max-w-screen-3xl mx-auto md:px-6 lg:px-10">
    <div class="px-4 md:px-0 mb-20">
      <div class="flex justify-between mt-8 mb-10">
        <h1 class="typography-headline-3 md:typography-headline-2 font-bold">Checkout</h1>
        <a
          class="inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed leading-5 text-sm py-1.5 px-3 gap-1.5 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 disabled:bg-transparent flex md:hidden whitespace-nowrap"
          href="/cart"
          ><svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block fill-current w-6 h-6 undefined"
          >
            <path
              d="m10.875 19.3-6.6-6.6a.883.883 0 0 1-.213-.325A1.115 1.115 0 0 1 4 12c0-.133.02-.258.062-.375a.883.883 0 0 1 .213-.325l6.6-6.6a.978.978 0 0 1 .687-.288.933.933 0 0 1 .713.288c.2.183.304.412.313.687a.933.933 0 0 1-.288.713L7.4 11h11.175a.97.97 0 0 1 .713.287.97.97 0 0 1 .287.713.97.97 0 0 1-.287.712.968.968 0 0 1-.713.288H7.4l4.9 4.9c.183.183.28.417.288.7a.872.872 0 0 1-.288.7c-.183.2-.417.3-.7.3a.988.988 0 0 1-.725-.3Z"
            ></path></svg
          >Back</a
        ><a
          class="inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed py-2 leading-6 px-4 gap-2 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 disabled:bg-transparent hidden md:flex"
          href="/cart"
          ><svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block fill-current w-6 h-6 undefined"
          >
            <path
              d="m10.875 19.3-6.6-6.6a.883.883 0 0 1-.213-.325A1.115 1.115 0 0 1 4 12c0-.133.02-.258.062-.375a.883.883 0 0 1 .213-.325l6.6-6.6a.978.978 0 0 1 .687-.288.933.933 0 0 1 .713.288c.2.183.304.412.313.687a.933.933 0 0 1-.288.713L7.4 11h11.175a.97.97 0 0 1 .713.287.97.97 0 0 1 .287.713.97.97 0 0 1-.287.712.968.968 0 0 1-.713.288H7.4l4.9 4.9c.183.183.28.417.288.7a.872.872 0 0 1-.288.7c-.183.2-.417.3-.7.3a.988.988 0 0 1-.725-.3Z"
            ></path></svg
          >Back</a
        >
      </div>
      <div
        v-if="cart.lineItems && cart.lineItems.length"
        :class="{ 'pending-implementation': cart.id === 'mocked-cart-id' }"
        class="md:grid md:grid-cols-12 md:gap-x-6"
      >
        <div class="col-span-7">
          <hr class="w-full h-px bg-neutral-200 w-screen md:w-auto -mx-4 md:mx-0" />
          <ShippingAddress
            title="Shipping Address"
            description="Add a shipping address to view shipping details."
            button-text="Add shipping address"
            :address-value="address"
            @change="onShippingAddressChange"
          />
          <hr class="w-full h-px bg-neutral-200 w-screen md:w-auto -mx-4 md:mx-0" />
          <ContactInformation
            title="Shipping details"
            description="Shipping details are comming soon."
          />
          <hr class="w-full h-px bg-neutral-200 w-screen md:w-auto -mx-4 md:mx-0" />
          <div class="md:px-4 py-6">
            <h3 class="typography-headline-4 text-neutral-900 font-bold mb-4">
              Payment method (comming soon)
            </h3>
            <div class="grid gap-4 grid-cols-2">
              <button
                type="button"
                class="border border-1 border-neutral-200 rounded h-20 flex items-center justify-center disabled:bg-neutral-100 disabled:opacity-50 focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-block fill-current w-6 h-6 mr-2"
                >
                  <path
                    d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2Zm0 14H4v-6h16v6Zm0-10H4V6h16v2Z"
                  ></path></svg
                ><span class="font-medium">Credit Card</span></button
              ><button
                type="button"
                class="border border-1 border-neutral-200 rounded h-20 flex items-center justify-center disabled:bg-neutral-100 disabled:opacity-50 focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600"
              >
                <div class="flex flex-col items-center justify-center">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 32">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.9 6.9H17c-.3 0-.7.3-.9.6l-2.4 15.3c0 .3.2.5.5.5H17c.3 0 .7-.4.9-.7l.7-4.2c0-.3.3-.7.8-.7h2c3.9 0 6.1-1.9 6.7-5.7.3-1.5 0-2.9-.7-3.8-1-.8-2.4-1.3-4.5-1.3Zm.7 5.7c-.4 2-2 2-3.5 2h-.9l.7-4c0-.1.2-.3.6-.3h.3c1 0 2 0 2.6.7.2.2.3.7.2 1.6ZM40.7 12.4h-2.8c-.2 0-.5.2-.5.3l-.2.9-.1-.3c-.7-1-2-1.3-3.3-1.3a6.6 6.6 0 0 0-6.4 5.7c-.4 1.8.1 3.3 1 4.4.9 1 2 1.4 3.6 1.4 2.6 0 4-1.6 4-1.6l-.2.9c0 .3.2.5.6.5H39c.3 0 .6-.4.8-.7l1.6-9.7c-.2-.2-.5-.5-.7-.5Zm-4 5.5c-.3 1.6-1.5 2.8-3.3 2.8-.8 0-1.5-.4-1.9-.7-.3-.5-.5-1.2-.5-2a3.2 3.2 0 0 1 3.1-2.8c.9 0 1.4.3 2 .6.4.6.6 1.4.6 2.1Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                    <path
                      d="M52.8 12.4h3c.3 0 .6.5 0 1l-9.4 13.7c-.2.2-.4.3-.7.3h-2.8c-.3 0-.5-.5-.3-.8l3-4.2-3.2-9.1c0-.4.2-.7.5-.7h2.8c.5 0 .7.1.9.5l1.7 5.5 3.8-5.9c.2-.1.3-.3.7-.3Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M65.2 6.9h-5.8c-.4 0-.7.3-1 .6l-2.3 15.3c0 .3.1.5.5.5h3.1c.3 0 .5-.2.5-.5l.7-4.4c0-.3.4-.7.9-.7h1.9c4 0 6.2-1.9 6.7-5.7.4-1.5 0-2.9-.7-3.8A7 7 0 0 0 65.2 7Zm.7 5.7c-.3 2-1.9 2-3.4 2h-1l.6-4c0-.1.2-.3.5-.3h.4c1 0 2 0 2.6.7.3.2.3.7.3 1.6ZM82.9 12.4H80c-.2 0-.5.2-.5.3l-.2.9-.2-.3c-.7-1-1.9-1.3-3.3-1.3a6.6 6.6 0 0 0-6.3 5.7c-.4 1.8.1 3.3 1 4.4.9 1 2 1.4 3.6 1.4 2.6 0 4-1.6 4-1.6l-.2.9c0 .3.2.5.5.5h2.6c.4 0 .7-.4.9-.7l1.6-9.7-.2-.1c-.1-.2-.3-.4-.5-.4Zm-4 5.5c-.4 1.6-1.6 2.8-3.3 2.8-.9 0-1.6-.4-1.9-.7-.3-.5-.5-1.2-.5-2a3.2 3.2 0 0 1 3-2.8c1 0 1.5.3 2 .6.7.6.9 1.4.7 2.1Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                    <path
                      d="m83.7 23 2.4-15.6c.2-.4.4-.5.6-.4h2.7c.4 0 .5.2.5.5l-2.4 15.3c-.1.3-.5.7-.8.7h-2.5c-.3 0-.5-.2-.5-.6Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                  </svg>
                  <span class="text-xs text-neutral-500">Coming soon</span>
                </div></button
              ><button
                type="button"
                class="border border-1 border-neutral-200 rounded h-20 flex items-center justify-center disabled:bg-neutral-100 disabled:opacity-50 focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600"
              >
                <div class="flex flex-col items-center justify-center">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 32">
                    <path
                      d="M34.5 3.4c.2 1.2-.3 2.4-1 3.3-.7.8-1.9 1.5-3 1.4-.2-1.2.4-2.4 1-3.1.8-.9 2-1.5 3-1.6ZM31.8 9c.8-.4 1.7-.7 2.7-.7.7 0 2.5.3 3.7 2-.3.3-2.2 1.5-2.2 3.9 0 2.9 2.4 4 2.7 4v.1c0 .2-.4 1.5-1.3 2.8-.9 1.3-1.8 2.5-3.2 2.5-.6 0-1-.1-1.5-.3-.5-.2-1-.5-1.8-.5s-1.3.3-1.8.5l-1.5.4c-1.3 0-2.3-1.4-3.2-2.6-1.7-2.5-3-7-1.3-10.2a5 5 0 0 1 4.2-2.5c.8 0 1.5.3 2.1.5l1.2.4c.4 0 .8-.2 1.2-.4Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M49 4.9c3.6 0 6.2 2.4 6.2 6 0 3.7-2.6 6.2-6.3 6.2h-4v6.4H42V4.9h7Zm-4 9.8h3.2c2.6 0 4-1.4 4-3.7 0-2.4-1.4-3.7-4-3.7H45v7.4ZM56 19.6c0-2.3 1.7-3.8 5-4l3.7-.2v-1c0-1.6-1-2.5-2.7-2.5-1.6 0-2.7.8-2.9 2h-2.6c.1-2.4 2.2-4.2 5.6-4.2 3.3 0 5.4 1.7 5.4 4.4v9.4h-2.7v-2.2a4.9 4.9 0 0 1-4.4 2.4c-2.6 0-4.5-1.6-4.5-4Zm8.7-1.2v-1l-3.4.1c-1.6.2-2.6.9-2.6 2 0 1.3 1 2 2.5 2 2 0 3.5-1.3 3.5-3Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                    <path
                      d="M70 26.2v2.3h1.1c2.9 0 4.2-1 5.4-4.3l5-14.3h-2.9l-3.4 11-3.5-11h-3l4.9 13.6-.1.3-.2.6c-.4 1.4-1.1 1.9-2.4 1.9H70Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                  </svg>
                  <span class="text-xs text-neutral-500">Coming soon</span>
                </div></button
              ><button
                type="button"
                class="border border-1 border-neutral-200 rounded h-20 flex items-center justify-center disabled:bg-neutral-100 disabled:opacity-50 focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600"
              >
                <div class="flex flex-col items-center justify-center">
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 32">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M50 24.2h-2.4V6h6.2c1.6 0 3 .5 4 1.6a5 5 0 0 1 1.7 3.8 5 5 0 0 1-1.7 4c-1 1-2.4 1.5-4 1.5h-3.9v7.4Zm0-16v6.3h3.8c1 0 1.8-.3 2.4-.9a3 3 0 0 0 0-4.5 3 3 0 0 0-2.4-1H50ZM65.7 11.3c1.7 0 3 .4 4 1.4a5 5 0 0 1 1.6 3.8v7.7H69v-1.7a4.5 4.5 0 0 1-4 2.1 5 5 0 0 1-3.4-1.2 4 4 0 0 1-1.4-3c0-1.4.5-2.4 1.5-3.2 1-.7 2.3-1.1 3.9-1.1 1.4 0 2.5.2 3.4.8v-.6c0-.8-.3-1.5-1-2-.6-.6-1.3-1-2.2-1-1.3 0-2.4.6-3.1 1.7l-2-1.3a5.7 5.7 0 0 1 5-2.4Zm-3 9c0 .7.2 1.2.7 1.6.5.4 1.1.6 1.8.6 1 0 2-.4 2.7-1 .8-.8 1.1-1.7 1.1-2.7-.7-.6-1.7-.8-3-.8a4 4 0 0 0-2.4.6c-.7.5-1 1-1 1.8Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                    <path
                      d="m76.2 29.7 7.9-18h-2.6l-3.6 9-3.8-9h-2.5l5.1 11.7-2.9 6.3h2.4ZM40.4 13.1l.2 2.2c0 3.2-1.2 5.9-3.2 7.7l-3.3-2.6c1.1-.8 1.8-2 2-3.3h-5.6v-4h9.9Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                    <path
                      d="M21.1 19.8c1.7 3.4 5.3 5.8 9.4 5.8 2.8 0 5.2-1 7-2.6L34 20.4c-1 .6-2.2 1-3.6 1a6.3 6.3 0 0 1-5.9-4.3l-3.5 2.7Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                    <path
                      d="m21.1 10.4 3.5 2.7a6.3 6.3 0 0 0 0 4l-3.5 2.7a10.5 10.5 0 0 1 0-9.4ZM30.5 8.7c1.5 0 3 .6 4 1.6l3-3a10.5 10.5 0 0 0-16.4 3l3.5 2.8a6.3 6.3 0 0 1 5.9-4.4Z"
                      fill="#71717A"
                      fill-opacity=".5"
                    />
                  </svg>
                  <span class="text-xs text-neutral-500">Coming soon</span>
                </div>
              </button>
            </div>
          </div>
          <div id="payment-element" class="md:px-4 py-6"></div>
          <hr class="w-full h-px bg-neutral-200 w-screen md:w-auto -mx-4 md:mx-0 mb-10" />
        </div>
        <OrderSummary :cart="cart" @place-order="placeOrder" />
        <div ref="card" class="card col-span-7"></div>
        <SfModal v-model="isOpenPaymentErrorModal">
          <template v-if="paymentError">
            <h3>{{ paymentError.name }}</h3>
            <p>{{ paymentError.message }}</p>
            <SfButton variant="secondary" @click="closePaymentErrorModal"> Close </SfButton>
          </template>
        </SfModal>
      </div>
      <div v-else class="flex flex-col items-center justify-center">
        <img src="/assets/images/empty-cart.svg" alt="Empty Cart" class="w-1/3 md:w-1/5" />
        <div class="typography-body-1 text-3xl">Your cart is empty</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { AdyenCheckout, Card, type CoreConfiguration } from '@adyen/adyen-web'
  import { SfButton, SfModal } from '@storefront-ui/vue'
  import type { Address } from '@/types/interfaces'
  import { useCartStore, useAlertsStore } from '@/stores'
  import ShippingAddress from '~/components/ShippingAddress.vue'
  import { ALERT_TYPE } from '@/types/enums'

  const config = useRuntimeConfig()

  const cartStore = useCartStore()
  const { addAlert } = useAlertsStore()

  const router = useRouter()

  const cart = computed(() => cartStore.cart)
  const address = computed(() => cartStore.address)
  const isOpenPaymentErrorModal = ref(false)
  const paymentError = ref<Error | null>(null)
  const closePaymentErrorModal = () => {
    isOpenPaymentErrorModal.value = false
    paymentError.value = null
  }

  onBeforeMount(async () => {
    await cartStore.loadCart()
  })

  definePageMeta({
    layout: 'checkout',
  })

  const cartAmount = computed(() => cart.value.totalPrice?.centAmount || 0)

  const card = ref<HTMLDivElement | null>(null)

  const createAdyenCheckout = (session: any): Promise<any> => {
    const configuration: CoreConfiguration = {
      clientKey: config.public.ADYEN_CLIENT_KEY,
      locale: 'en_US',
      environment: 'test',
      showPayButton: true,

      session,
      onPaymentCompleted: async (result: any) => {
        if (result.resultCode === 'Authorised') {
          await cartStore.placeOrder()
          router.push('/order/success?orderId=' + cartStore.orderId)
        }
      },
      onPaymentFailed: (result: any, component: any) => {
        component.setStatus('ready')
        if (result.resultCode === 'Refused') {
          paymentError.value = new Error(
            'The payment was refused. Please recheck your payment details',
          )
          isOpenPaymentErrorModal.value = true
        } else if (result.resultCode === 'Error') {
          paymentError.value = new Error(
            'Error! Please review response in developer console/network tab/Fetch&XHR requests',
          )
          isOpenPaymentErrorModal.value = true
        }
      },
      onError: (error: any, component: any) => {
        console.error(error.name, error.message, error.stack, component)
        paymentError.value = new Error(error.message)
        isOpenPaymentErrorModal.value = true
      },
    }

    return AdyenCheckout(configuration)
  }

  async function placeOrder() {
    try {
      if (!cartStore.address) {
        addAlert({
          type: ALERT_TYPE.ERROR,
          message: 'Please add a shipping address',
        })
      }

      const { data: paymentSession } = await cartStore.createPaymentSession(cartAmount.value)

      const checkout = await createAdyenCheckout(paymentSession)

      if (card.value) {
        new Card(checkout).mount(card.value)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function onShippingAddressChange(address: Address) {
    await cartStore.setAddress(address)

    addAlert({
      type: ALERT_TYPE.SUCCESS,
      message: 'Shipping address updated successfully',
    })
  }
</script>
