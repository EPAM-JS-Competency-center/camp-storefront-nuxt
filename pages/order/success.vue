<template>
    <div class="max-w-screen-3xl mx-auto md:px-6 lg:px-10" data-testid="narrowContainer">
        <div data-testid="order-success-page" class="px-4 md:px-0">
            <div
                class="border border-1 border-neutral-200 mt-10 mb-20 rounded p-4 md:p-6 flex flex-col items-center max-w-2xl mx-auto">
                <img alt="order successful image" loading="lazy" width="192" height="192" decoding="async" data-nimg="1"
                    style="color:transparent" src="/assets/images/order-success.svg">
                <h1 class="typography-headline-3 font-bold mt-6 mb-1">
                    Thank you!
                </h1>
                <span class="font-medium">
                    Your order was completed successfully.
                </span>
                <div class="border border-1 border-neutral-200 rounded bg-neutral-100 p-4 w-full my-4 text-sm">
                    <h5 class="typography-headline-5 font-medium">
                        Estimated delivery time
                    </h5>
                    <p class="capitalize">
                        tomorrow
                    </p>
                    <h5 class="typography-headline-5 font-medium mt-4">
                        Order number
                    </h5>
                    <p>{{orderId}}</p>
                </div><a
                    class="inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-disabled-500 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed py-2 leading-6 px-4 gap-2 text-primary-700 hover:bg-primary-100 hover:text-primary-800 active:bg-primary-200 active:text-primary-900 ring-1 ring-inset ring-primary-700 hover:shadow-md active:shadow shadow hover:ring-primary-800 active:ring-primary-900 disabled:ring-1 disabled:ring-disabled-300 disabled:bg-white/50 max-md:w-full"
                    data-testid="button" href="/">Continue shopping</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = route.query.orderId as string

definePageMeta({
  layout: 'checkout',
})
</script>
