<!-- src/views/PreferencesView.vue -->
<script setup>
import { useWeatherStore } from "@/stores/weatherStore"

const weatherStore = useWeatherStore()

function toggle(type) {
  weatherStore.setAlertPreference(type, !weatherStore.alertPreferences[type])
}
</script>

<template>
  <main class="container py-4 preferences-view">
    <h1 class="mb-4">Preferencias</h1>

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
.preferences-view h1,
.preferences-view h3 {
  color: var(--main-text);
}

.prefs-card {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  color: var(--main-text);
}

.form-check-label {
  color: var(--main-text);
}
</style>
