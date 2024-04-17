<template>
    <div class="md:px-4 py-6">
        <div class="flex justify-between">
            <h2 class="typography-headline-4 text-neutral-900 font-bold mb-4">
                {{ title }}
            </h2>
            <a v-if="addressValue"
                href="javascript:void(0)"
                class="text-primary-700 hover:text-primary-800 active:text-primary-900" @click="open()">
                Edit
            </a>
        </div>
        <div v-if="!addressValue" class="w-full md:max-w-[520px]">
            <p>{{ description }}</p>
            <SfButton v-if="buttonText" class="mt-4" variant="secondary" @click="open()">
                {{ buttonText }}
            </SfButton>
        </div>

        <div v-else class="w-full md:max-w-[520px]">
            <div class="flex flex-col gap-2 mt-2">
                <span>{{ addressValue.firstName }} {{ addressValue.lastName }}</span>
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <span>{{ addressValue.country }}, {{ addressValue.city }} </span>
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <span>{{ addressValue.postalCode }}, {{ addressValue.streetName }} {{ addressValue.streetNumber }} </span>
            </div>
            <div class="flex flex-col gap-2 mt-2">
                <span>{{ addressValue.email }} </span>
            </div>
        </div>
    </div>

    <SfModal v-model="isOpen"
        class="fixed max-h-dvh inset-0 w-fit h-fit m-auto p-6 pt-10 lg:p-10 border border-neutral-100 bg-white shadow-xl rounded-xl outline-none h-full w-full overflow-auto md:w-[600px] md:h-fit z-50"
        tag="section" role="alertdialog" aria-labelledby="promoModalTitle" aria-describedby="promoModalDesc">
        <header class="">
            <SfButton square variant="tertiary" class="absolute right-2 top-2" @click="close">
                <SfIconClose />
            </SfButton>
            <h3 id="promoModalTitle" class="font-bold typography-headline-4 md:typography-headline-3">
                Shipping Address
            </h3>
        </header>
        <div class="mt-2">
            <div class="mt-4">
                <label>
                    <span class="text-sm font-medium">Email</span>
                    <SfInput v-model="address.email" />
                </label>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
                <label>
                    <span class="text-sm font-medium">First Name</span>
                    <SfInput :model-value="address.firstName" @update:model-value="(value) => {
                        address.firstName = value
                    }" />
                </label>
                <label>
                    <span class="text-sm font-medium">Last Name</span>
                    <SfInput :model-value="address.lastName" @update:model-value="(value) => {
                        address.lastName = value
                    }" />
                </label>
            </div>

            <div class="mt-4">
                <label>
                <span class="pb-1 text-sm font-medium text-neutral-900">Country</span>
                <SfSelect :model-value="address.country" size="base" placeholder="-- Select --" @update:model-value="(value) => {
                    address.country = value
                }">
                    <option v-for="{ value, label } in countriesOptions" :key="value" :value="value">
                        {{ label }}
                    </option>
                </SfSelect>
                </label>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-4">
                <label>
                    <span class="text-sm font-medium">City</span>
                    <SfInput :model-value="address.city" @update:model-value="(value) => {
                        address.city = value
                    }" />
                </label>
                <label>
                    <span class="text-sm font-medium">Postal Code</span>
                    <SfInput :model-value="address.postalCode" @update:model-value="(value) => {
                        address.postalCode = value
                    }" />
                </label>
            </div>

            <div class="mt-4 grid grid-cols-4 gap-4">
                <label class="col-span-3">
                    <span class="text-sm font-medium">Street Name</span>
                    <SfInput :model-value="address.streetName" @update:model-value="(value) => {
                        address.streetName = value
                    }" />
                </label>
                <label>
                    <span class="text-sm font-medium">Number</span>
                    <SfInput :model-value="address.streetNumber" @update:model-value="(value) => {
                        address.streetNumber = value
                    }" />
                </label>
            </div>

            <div class="mt-4 grid grid-cols-2 gap-4">
                <label>
                    <span class="text-sm font-medium">Region</span>
                    <SfSelect v-model="address.region" size="base" placeholder="-- Select --">
                        <option v-for="{ value, label } in regionOptions" :key="value" :value="value">
                            {{ label }}
                        </option>
                    </SfSelect>
                </label>
            </div>
        </div>
        <footer class="flex justify-end gap-4 mt-4">
            <SfButton variant="secondary" @click="close">
                Cancel
            </SfButton>
            <SfButton class="bg-primary" @click="() => {
                    $emit('change', address)
                    close()
                }">
                Save
            </SfButton>
        </footer>
    </SfModal>
</template>

<script setup lang="ts">
import { SfModal, SfButton, SfInput, SfSelect, SfIconClose, useDisclosure } from '@storefront-ui/vue'
import type { Address } from '~/types/interfaces'
const { isOpen, open, close } = useDisclosure({ initialValue: false })

defineProps<{
    title: string
    description: string
    buttonText?: string
    addressValue?: Address
}>()

defineEmits<{
    (e: 'change', address: Address): void
}>()

const address = ref<Address>({
    country: 'DE',
    firstName: 'TestName',
    lastName: 'TestSurname',
    streetName: 'Test Street Name',
    streetNumber: '13',
    postalCode: '10285',
    city: 'Berlin',
    region: 'Berlin',
    email: 'jonh_doe@example.com'
})

const countriesOptions = [
    {
        value: 'DE',
        label: 'Germany'
    }
]

const regionOptions = [
    {
        value: 'Berlin',
        label: 'Berlin'
    },
    {
        value: 'Hamburg',
        label: 'Hamburg'
    }
]
</script>
