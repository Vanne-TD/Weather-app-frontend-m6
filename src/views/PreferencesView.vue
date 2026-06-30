<!-- src/views/PreferencesView.vue -->
<script setup>
import { useWeatherStore } from "@/stores/weatherStore"

const weatherStore = useWeatherStore()

function toggle(type) {
  weatherStore.setAlertPreference(type, !weatherStore.alertPreferences[type])
}
</script>

<template>
  <main class="container py-4">
    <h1 class="mb-4">Preferencias</h1>

    <h3 class="mb-3">Alertas del clima</h3>

    <div class="form-check mb-2">
      <input
        class="form-check-input"
        type="checkbox"
        id="alertHeat"
        :checked="weatherStore.alertPreferences.heat"
        @change="toggle('heat')"
      />
      <label class="form-check-label" for="alertHeat">
        Ola de calor
      </label>
    </div>

    <div class="form-check mb-2">
      <input
        class="form-check-input"
        type="checkbox"
        id="alertCold"
        :checked="weatherStore.alertPreferences.cold"
        @change="toggle('cold')"
      />
      <label class="form-check-label" for="alertCold">
        Ola de frío
      </label>
    </div>

    <div class="form-check mb-2">
      <input
        class="form-check-input"
        type="checkbox"
        id="alertWind"
        :checked="weatherStore.alertPreferences.wind"
        @change="toggle('wind')"
      />
      <label class="form-check-label" for="alertWind">
        Viento fuerte
      </label>
    </div>

    <div class="form-check mb-2">
      <input
        class="form-check-input"
        type="checkbox"
        id="alertRain"
        :checked="weatherStore.alertPreferences.rain"
        @change="toggle('rain')"
      />
      <label class="form-check-label" for="alertRain">
        Lluvia
      </label>
    </div>
  </main>
</template>

<style scoped></style>
