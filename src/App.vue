<!-- src/App.vue -->
<script setup>
import HeaderLayout from './layout/HeaderLayout.vue'
import FooterLayout from './layout/FooterLayout.vue'
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()
</script>

<template>
  <div :class="weatherStore.theme" class="d-flex flex-column min-vh-100">
    <HeaderLayout />
    <main class="flex-grow-1">
      <RouterView />
    </main>
    <FooterLayout />
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/themes/_index.scss";
</style>

<style scoped>
main {
  padding-top: 20px;
}
</style>
