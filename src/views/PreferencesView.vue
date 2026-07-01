<!-- src/views/PreferencesView.vue -->
<script setup>
import { computed } from 'vue'
import { useWeatherStore } from "@/stores/weatherStore"
import { useUserStore } from '@/stores/userStore'

const weatherStore = useWeatherStore()
const userStore = useUserStore()

const unitsLabel = computed(() => weatherStore.units === 'metric' ? '°C' : '°F')

function toggle(type) {
  weatherStore.setAlertPreference(type, !weatherStore.alertPreferences[type])
}

function toggleUnits() {
  weatherStore.toggleUnits()
  userStore.updatePreferences({ units: weatherStore.units })
}
</script>

<template>
  <main class="container py-4 preferences-view">
    <h1 class="mb-4">Preferencias</h1>

    <div class="prefs-card mb-4">
      <h3 class="mb-3">Unidades preferidas</h3>
      <p>Actualmente tienes configuradas las unidades: <strong>{{ unitsLabel }}</strong></p>
      <button class="toggle-btn" @click="toggleUnits">
        Cambiar a {{ weatherStore.units === 'metric' ? '°F' : '°C' }}
      </button>
    </div>

    <h3 class="mb-3">Alertas del clima</h3>

    <div class="prefs-card">
      <div class="form-check mb-2" v-for="type in ['heat','cold','wind','rain']" :key="type">
        <input
          class="form-check-input"
          type="checkbox"
          :id="type"
          :checked="weatherStore.alertPreferences[type]"
          @change="toggle(type)"
        />
        <label class="form-check-label" :for="type">
          {{ type === 'heat' ? 'Ola de calor' :
             type === 'cold' ? 'Ola de frío' :
             type === 'wind' ? 'Viento fuerte' :
             'Lluvia' }}
        </label>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>
