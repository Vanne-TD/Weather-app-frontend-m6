<!-- src/views/DetailsView.vue -->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWeatherStore } from '@/stores/weatherStore'

import WeatherWeekly from '@/components/WeatherWeeklyComponent.vue'
import WeatherDetailsCardComponent from '@/components/WeatherDetailsCardComponent.vue'
import UnitsButtonComponent from '@/components/UnitsButtonComponent.vue'
import WeatherStatusComponent from '@/components/WeatherStatusComponent.vue'
import WeatherAlertsComponent from '@/components/WeatherAlertsComponent.vue'
import WeatherStatsComponent from '@/components/WeatherStatsComponent.vue'

// ===============================
// Rutas
// ===============================
const route = useRoute()
const router = useRouter()

// ===============================
// PINIA STORE
// ===============================
const weatherStore = useWeatherStore()

// ===============================
// Ciudad desde la ruta
// ===============================
const city = ref(route.params.city)

// ===============================
// Estadísticas desde el store
// ===============================
const stats = computed(() => weatherStore.stats)

// ===============================
// Label para botón de unidades (igual que Home)
// ===============================
const unitsLabel = computed(() =>
  weatherStore.units === "metric" ? "°C" : "°F"
)

// ===============================
// Cargar datos al iniciar
// ===============================
onMounted(async () => {
  const data = await weatherStore.fetchWeatherByName(city.value)
  await weatherStore.fetchWeatherById(data.id)
  await weatherStore.fetchWeeklyById(data.id)
})

// ===============================
// Cambiar unidades (igual que Home)
// ===============================
async function toggleUnits() {
  weatherStore.toggleUnits()

  const data = await weatherStore.fetchWeatherByName(city.value)
  await weatherStore.fetchWeatherById(data.id)
  await weatherStore.fetchWeeklyById(data.id)
}

// ===============================
// Marcar favorita
// ===============================
function marcarFavorita() {
  if (weatherStore.weather?.name) {
    weatherStore.setFavoriteCity(weatherStore.weather.name)
  }
}

// ===============================
// Volver al Home
// ===============================
function volver() {
  router.push('/')
}
</script>

<template>
  <main class="container py-4 detail-page">

    <!-- BOTÓN VOLVER -->
    <div class="detail-page__header">
      <button class="back-btn" @click="$router.back()">
        <span class="back-btn__icon">←</span>
        <span class="back-btn__text">Volver</span>
      </button>
    </div>

    <h1 class="mb-4 text-center detail-page__title">
      Detalles de {{ city }}
    </h1>

    <!-- ERROR -->
    <div v-if="weatherStore.error" class="status-card error-card">
      ⚠ {{ weatherStore.error }}
    </div>

    <!-- LOADING -->
    <div v-if="weatherStore.loading" class="status-card loading-card">
      ⏳ Cargando clima...
    </div>

    <!-- BOTÓN FAVORITA -->
    <button
      v-if="weatherStore.weather"
      class="favorite-btn mb-3"
      @click="marcarFavorita"
    >
      ⭐ Marcar como favorita
    </button>

    <!-- TARJETA DE DETALLES -->
    <WeatherDetailsCardComponent
      v-if="weatherStore.weather"
      :weather="{
        description: weatherStore.weather.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${weatherStore.weather.weather[0].icon}@2x.png`,
        temp: Math.round(weatherStore.weather.main.temp),
        humidity: weatherStore.weather.main.humidity,
        wind: weatherStore.weather.wind.speed,
        pressure: weatherStore.weather.main.pressure,
        feels_like: Math.round(weatherStore.weather.main.feels_like)
      }"
      :units="weatherStore.units"
    />

    <!-- PRONÓSTICO SEMANAL -->
    <WeatherWeekly
      v-if="weatherStore.weekly && weatherStore.weekly.length"
      :data="weatherStore.weekly"
      :units="weatherStore.units"
      class="mt-4"
    />

    <!-- ESTADÍSTICAS -->
    <WeatherStatsComponent
      v-if="stats"
      :stats="stats"
      class="mt-4"
    />

    <!-- ALERTAS -->
    <WeatherAlertsComponent
      v-if="weatherStore.filteredAlerts().length"
      class="mt-4"
    />

    <!-- BOTÓN DE UNIDADES (final a la derecha) -->
    <div class="units-bottom-wrapper mt-4">
      <UnitsButtonComponent
        :label="unitsLabel"
        @click="toggleUnits"
      />
    </div>

  </main>
</template>

<style scoped>
.units-bottom-wrapper {
  display: flex;
  justify-content: flex-end; /* ⭐ derecha */
}
</style>
