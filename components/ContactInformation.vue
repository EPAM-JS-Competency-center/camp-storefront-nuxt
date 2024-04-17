<template>
  <div class="md:px-4 py-6">
    <div class="flex justify-between">
      <h2 class="typography-headline-4 text-neutral-900 font-bold mb-4">
        {{ title }}
      </h2>
      <a v-if="emailDisplayValue.email"
        href="javascript:void(0)"
        class="text-primary-700 hover:text-primary-800 active:text-primary-900"
        @click="open()">
        Edit
      </a>
    </div>
    <div v-if="!emailDisplayValue.email" class="w-full md:max-w-[520px]">
      <p>{{ description }}</p>
      <SfButton v-if="buttonText" class="mt-4" variant="secondary" @click="open()">
        {{ buttonText }}
      </SfButton>
    </div>
    <div v-if="emailDisplayValue.email">
      <p class="mb-4">
        <strong>Email:</strong> {{ emailDisplayValue.email }}
      </p>
    </div>
  </div>

  <SfModal v-model="isOpen" class="fixed inset-0 w-fit h-fit m-auto p-6 pt-10 lg:p-10 border border-neutral-100 bg-white shadow-xl rounded-xl outline-none h-full w-full overflow-auto md:w-[600px] md:h-fit z-10" tag="section" role="alertdialog"
        aria-labelledby="promoModalTitle" aria-describedby="promoModalDesc">
        <header class="">
            <SfButton square variant="tertiary" class="absolute right-2 top-2" @click="close">
                <SfIconClose />
            </SfButton>
            <h3 id="promoModalTitle" class="font-bold typography-headline-4 md:typography-headline-3">
               Contact Information
            </h3>
        </header>
        <div class="mt-2">
          <SfInput aria-label="Email" aria-placeholder="Please provide your email" :model-value="emailValue"
            placeholder="Please provide your email" @update:model-value="emailValue = $event"
          />
          <small class="typography-text-xs text-neutral-600">Please provide your emails into the field above</small>
        </div>
        <footer class="flex justify-end gap-4 mt-4">
            <SfButton variant="secondary" @click="close">
                Cancel
            </SfButton>
            <SfButton class="bg-primary" @click="() => {
              emailDisplayValue.email = emailValue
              close()
            }">
                Save
            </SfButton>
        </footer>
    </SfModal>
</template>

<script setup lang="ts">
import { SfModal, SfButton, SfInput, SfIconClose, useDisclosure } from '@storefront-ui/vue'
const { isOpen, open, close } = useDisclosure({ initialValue: false })

defineProps<{
  title: string
  description: string
  buttonText?: string
}>()

defineEmits<{
  (n: 'button-click'): void
}>()

const emailValue = ref('')
const emailDisplayValue = reactive({
  email: ''
})

// @click="$emit('button-click')"
</script>
