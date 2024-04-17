<template>
    <div>
        <div v-if="type === 'success'" role="alert"
            class="flex items-start md:items-center max-w-[600px] shadow-md bg-positive-100 pr-2 pl-4 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md">
            <SfIconCheckCircle class="my-2 mr-2 text-positive-700 shrink-0" />
            <p class="py-2 mr-2">
                {{ message }}
            </p>
            <button type="button"
                class="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900 focus-visible:outline focus-visible:outline-offset"
                aria-label="Close positive alert">
                <SfIconClose class="hidden md:block" @click="remove" />
                <SfIconClose size="sm" class="block md:hidden" @click="remove" />
            </button>
        </div>
        <div v-if="type === 'error'" role="alert"
            class="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md">
            <p class="py-2 mr-2">
                {{ message }}
            </p>
            <button type="button"
                class="p-1.5 md:p-2 ml-2 rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900 focus-visible:outline focus-visible:outline-offset"
                aria-label="Close error alert">
                <SfIconClose class="hidden md:block" @click="remove" />
                <SfIconClose size="sm" class="block md:hidden" @click="remove" />
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { SfIconCheckCircle, SfIconClose } from '@storefront-ui/vue'
import { defineProps } from 'vue'
import { useAlerts } from '~/stores'

const props = defineProps<{
    message: string
    type: string
    index: number
}>()

const { removeAlert } = useAlerts()

function remove() {
    removeAlert(props.index)
}
</script>
