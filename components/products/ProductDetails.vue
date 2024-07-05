<template>
  <ProductPromos
    v-if="!isLoading && productSku"
    :sku="productSku"
  >
  </ProductPromos>
  <div class="md:grid gap-x-6 grid-areas-product-page grid-cols-product-page"
    :class="{'pending-implementation': pdpIsMocked}"
  >
    <BaseLoader v-show="isLoading" />
    <ProductGallery v-if="!isLoading && selectedProduct" :images="productImages" />

    <section class="mb-10 grid-in-right md:mb-0">
      <BaseLoader v-show="isLoading" />
      <ProductCartDetails v-if="!isLoading && selectedProduct" :product="selectedProduct" />
    </section>

    <section class="grid-in-left-bottom md:mt-8">
      <hr class="w-full h-px bg-neutral-200 mb-6" />
      <div v-if="selectedProduct?.sizes.length" class="px-4">
        <span class="block text-base font-medium leading-6 text-neutral-900">Size</span>
        <ul class="grid grid-cols-5 gap-2 py-2">
          <li v-for="size in selectedProduct.sizes" :key="size.key">
            <SfChip
              :class="[
                'w-full',
                {
                  'font-bold': size.key === productSize?.key,
                  'bg-primary-100': size.key === selectedSize?.key,
                },
              ]"
              size="sm"
              @click="updateSize(size)"
            >
              {{ size.label }}
            </SfChip>
          </li>
        </ul>
      </div>
      <div v-if="selectedProduct?.sizes.length" class="px-4">
        <span class="block text-base font-medium leading-6 text-neutral-900">Color</span>
        <ul class="grid grid-cols-5 gap-2 py-2">
          <li v-for="color in availableColors" :key="color.key">
            <SfListItem
              size="sm"
              tag="label"
              :class="[
                'px-1.5 bg-transparent hover:bg-transparent',
                { 'font-bold': color.key === selectedColor?.key },
              ]"
              :selected="color.key === selectedColor?.key"
              @click="updateColor(color)"
            >
              <template #prefix>
                <input :value="color.key" class="appearance-none peer" type="checkbox" />
                <span
                  class="inline-flex items-center justify-center p-1 transition duration-300 rounded-full cursor-pointer ring-1 ring-neutral-200 ring-inset outline-offset-2 outline-secondary-600 peer-checked:ring-2 peer-checked:ring-primary-700 peer-hover:bg-primary-100 peer-[&:not(:checked):hover]:ring-primary-200 peer-active:bg-primary-200 peer-active:ring-primary-300 peer-disabled:cursor-not-allowed peer-disabled:bg-disabled-100 peer-disabled:opacity-50 peer-disabled:ring-1 peer-disabled:ring-disabled-200 peer-disabled:hover:ring-disabled-200 peer-checked:hover:ring-primary-700 peer-checked:active:ring-primary-700 peer-focus-visible:outline"
                  :class="{ 'bg-primary-100': color.key === selectedColor?.key }"
                  ><SfThumbnail
                    class="w-6 h-6"
                    size="sm"
                    :style="{ background: color.label.toLowerCase() }"
                /></span>
              </template>
              <p>
                <span class="mr-2 typography-text-sm">{{ color.label }}</span>
              </p>
            </SfListItem>
          </li>
        </ul>
      </div>
      <hr class="w-full h-px bg-neutral-200 mt-4 mb-2 md:mt-8" />
      <details>
        <summary
          class="md:rounded-md w-full hover:bg-neutral-100 py-2 pl-4 pr-3 flex justify-between items-center list-none [&amp;::-webkit-details-marker]:hidden cursor-pointer focus-visible:outline focus-visible:outline-offset focus-visible:outline focus-visible:rounded-sm"
        >
          <h2 class="typography-headline-4 md:typography-headline-3 font-bold">
Product Details
</h2>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block fill-current w-6 h-6 text-neutral-500 transition-transform rotate-180"
          >
            <path
              d="M17 15a.998.998 0 0 1-1.41 0l-3.885-3.875L7.82 15a.998.998 0 0 1-1.41-1.412l4.588-4.587a1 1 0 0 1 1.414 0L17 13.589A.998.998 0 0 1 17 15Z"
            ></path>
          </svg>
        </summary>
        <div class="py-2">
          <div
            v-if="selectedProduct"
            class="text-neutral-900 px-4"
            v-html="selectedProduct.description"
          ></div>
        </div>
      </details>
    </section>
    <hr class="w-full h-px bg-neutral-200 mt-4 mb-2" />
  </div>
</template>

<script setup lang="ts">
  import { SfChip, SfListItem, SfThumbnail } from '@storefront-ui/vue'
  import ProductGallery from '~/components/products/ProductGallery.vue'
  import ProductCartDetails from '~/components/products/ProductCartDetails.vue'
  import ProductPromos from '~/components/products/ProductPromos.vue'
  import type ProductAttributeDTO from '~/DTO/ProductAttribute'
  import type ProductVariantDTO from '~/DTO/ProductVariant'

  defineProps<{
    isLoading: boolean
  }>()

  const router = useRouter()
  const route = useRoute()

  const productStore = useProductStore()
  const selectedSize = ref<ProductAttributeDTO | null>(null)
  const selectedColor = ref<ProductAttributeDTO | null>(null)

  const selectedProduct = computed(() => productStore.selectedProduct)

  const productImages = computed(() => selectedProduct.value?.masterVariant.images || [])
  const productSize = computed(() => selectedProduct.value?.masterVariant.size || null)
  const productColor = computed(() => selectedProduct.value?.masterVariant.color || null)

  watch(productSize, value => (selectedSize.value = value))
  watch(productColor, value => (selectedColor.value = value))

  const availableColors = computed<ProductAttributeDTO[]>(() => {
    const colors: Record<string, ProductAttributeDTO> = {}

    selectedProduct.value?.variants.forEach((variant) => {
      if (variant.size?.key === selectedSize.value?.key) {
        variant.color?.key && (colors[variant.color?.key] = variant.color)
      }
    })

    return Object.values(colors)
  })

  const expectedProduct = computed<ProductVariantDTO | null>(() => {
    if (!selectedProduct.value) {
      return null
    }

    if (
      selectedSize.value?.key === productSize.value?.key &&
      selectedColor.value?.key === productColor.value?.key
    ) {
      return selectedProduct.value.masterVariant
    }

    return (
      selectedProduct.value.variants.find((variant) => {
        return (
          variant.size?.key === selectedSize.value?.key &&
          variant.color?.key === selectedColor.value?.key
        )
      }) || null
    )
  })

  watch(expectedProduct, async (value, oldValue) => {
    if (
      value &&
      value.id !== oldValue?.id &&
      value.id !== selectedProduct.value?.masterVariant.id
    ) {
      await router.push(`/products/${value.sku}`)
    }
  })

  const updateSize = (size: ProductAttributeDTO) => {
    if (size !== selectedSize.value) {
      // selectedColor.value = null
      selectedSize.value = size
      // Check if there is a similar variant for the color
      // If no, take first matching for size
      const similarVariant = selectedProduct.value?.variants.find(
        variant => variant.size?.key === size.key && variant.color?.key === productColor.value?.key
      )

      if (similarVariant) {
        selectedColor.value = similarVariant.color
      } else {
        const firstMatchingVariant = selectedProduct.value?.variants.find(
          variant => variant.size?.key === size.key
        )
        // Should be always true, but just in case
        if (firstMatchingVariant) {
          selectedColor.value = firstMatchingVariant.color
        }
      }
    }
  }

  const updateColor = (color: ProductAttributeDTO) => {
    selectedColor.value = color
  }

  const pdpIsMocked = computed(() => productStore.pdpIsMocked)
  const productSku = computed(() => route.params.sku as string)
</script>
