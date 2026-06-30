<!-- src/layout/HeaderLayout.vue -->
<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()
</script>

<template>
  <header :class="['l-header', weatherStore.theme]">
    <NavbarComponent />
  </header>
</template>

<style scoped lang="scss"></style>
