<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// ⭐ Computed para leer la unidad desde Vuex
const units = computed(() => store.state.user.preferences.units)

// ⭐ Cambiar unidad y guardar en Vuex
function cambiarUnidad() {
  store.commit('updatePreferences', {
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
