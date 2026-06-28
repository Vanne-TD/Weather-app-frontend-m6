<script setup>
import { useStore } from 'vuex'

const store = useStore()

function cambiarUnidad() {
  store.commit('updatePreferences', {
    units: store.state.user.preferences.units === 'metric' ? 'imperial' : 'metric'
  })
}
</script>

<template>
  <main class="container py-4">
    <h1>Mis preferencias</h1>

    <button class="btn btn-secondary" @click="cambiarUnidad">
      Cambiar a {{ store.state.user.preferences.units === 'metric' ? '°F' : '°C' }}
    </button>
  </main>
</template>
