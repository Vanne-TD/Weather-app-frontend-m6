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
import { watch } from 'vue'
import HeaderLayout from './layout/HeaderLayout.vue'
import FooterLayout from './layout/FooterLayout.vue'
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()

// ⭐ Aplicar la clase del tema al <html>
watch(
  () => weatherStore.theme,
  (newTheme) => {
    document.documentElement.className = newTheme
  },
  { immediate: true }
)
</script>

<template>
  <div class="app-wrapper">
    <HeaderLayout />
    <main class="flex-grow-1">
      <RouterView />
    </main>
    <FooterLayout />
  </div>
</template>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>





