<template>
  <div>
    <CheckoutHeader />
    <main class="relative">
      <div class="fixed top-100 md:right-10 z-50">
        <Alert v-for="(alert, index) in alerts" :key="index"
           class="shadow-md ease-out mt-2" :message="alert.message" :index="index" :type="alert.type" />
      </div>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
  import CheckoutHeader from '~/components/headers/CheckoutHeader.vue'
  import Alert from '~/components/alerts/Alert.vue'
  import { useAlertsStore } from '~/stores'

  const { alerts } = useAlertsStore()
</script>
