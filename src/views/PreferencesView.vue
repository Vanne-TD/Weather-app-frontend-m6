<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

// ⭐ Pinia store
const userStore = useUserStore()

// ⭐ Computed para leer la unidad desde Pinia
const units = computed(() => userStore.preferences.units)

// ⭐ Cambiar unidad y guardar en Pinia
function cambiarUnidad() {
  userStore.updatePreferences({
    units: units.value === 'metric' ? 'imperial' : 'metric'
  })
}
</script>

<template>
  <main class="container py-4">
    <h1 class="mb-4">Mis preferencias</h1>

    <button class="btn btn-secondary" @click="cambiarUnidad">
      Cambiar a {{ units === 'metric' ? '°F' : '°C' }}
    </button>
  </main>
</template>

<style scoped lang="scss">
</style>
