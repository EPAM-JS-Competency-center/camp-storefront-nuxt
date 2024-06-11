<template>
    <div v-if="promos"
        class="my-3"
    >
        <div v-for="promo in promos.promos" :key="promo.order">
            <div v-html="promo.text"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { getPromos } from '~/services/promos.service'
    import type { Layout } from '~/types/layout'

    const props = defineProps<{
        sku: string
    }>()

    const promos = ref<Layout|undefined>()

    watch(() => props.sku, fetchPromos, { immediate: true })

    async function fetchPromos() {
        if (props.sku) {
            try {
                const promosForProduct = await getPromos(props.sku)
                promos.value = promosForProduct
            } catch (error) {
                // Only for "WJ01-S-Blue"
                if (props.sku === 'WJ01-S-Blue') {
                    promos.value = {
                        sku: props.sku,
                        promos: [{
                            order: 2,
                            text: `
                                <div class="p-4 my-2 flex h-[300px] shadow rounded-xl">
                                    <div class="flex-grow">
                                        <h2 class="text-2xl font-serif">A mocked promo with order: 2</h2>
                                    </div>
                                    <div>
                                        <img src="/assets/images/mountain-promo-example-2.webp" alt="promo-2" 
                                            class="h-[100%] rounded-xl"
                                        />
                                    </div>
                                </div>
                            `
                        }, {
                            order: 1,
                            text: `
                                <div class="p-4 my-2 flex h-[300px] shadow-lg rounded-xl">
                                    <div class="flex-grow">
                                        <h2 class="text-2xl font-serif">A mocked promo with order: 1</h2>
                                        <p>Promo text</p>
                                    </div>
                                    <div>
                                        <img src="/assets/images/city-promo-example-1.webp" alt="promo-1" 
                                            class="h-[100%] rounded-xl"
                                        />
                                    </div>
                                </div>
                            `
                        }].sort((a, b) => a.order - b.order)
                    }
                } else {
                    promos.value = undefined
                }
            }
        }
    };

</script>
