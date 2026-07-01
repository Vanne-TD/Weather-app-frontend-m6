<!-- src/App.vue -->

<script setup>
import { watch } from 'vue'
import MainLayout from './layout/MainLayout.vue'
import { useWeatherStore } from '@/stores/weatherStore'
import { useUserStore } from '@/stores/userStore'

const weatherStore = useWeatherStore()
const userStore = useUserStore()

userStore.init()


watch(
  () => weatherStore.theme,
  (newTheme) => {
    document.documentElement.className = newTheme
  },
  { immediate: true }
)
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>
