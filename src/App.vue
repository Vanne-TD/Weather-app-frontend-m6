<!-- src/App.vue -->
 <!-- <script setup>
import { useWeatherStore } from "@/stores/weatherStore"
const weatherStore = useWeatherStore()
</script>

<template>
  <div :class="weatherStore.theme">
    <RouterView />
  </div>
</template>

<style>
/* opcional: reset global */
html, body {
  background-color: var(--bg);
  color: var(--text);
}
</style> -->

<script setup>
import HeaderLayout from './layout/HeaderLayout.vue'
import FooterLayout from './layout/FooterLayout.vue'
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()
</script>

<template>
  <!-- ⭐ ESTA LÍNEA ES LA CLAVE -->
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
