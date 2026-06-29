<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWeatherStore } from '@/stores/weatherStore'

import WeatherWeekly from '@/components/WeatherWeeklyComponent.vue'
import WeatherDetailsCardComponent from '@/components/WeatherDetailsCardComponent.vue'
import UnitsButtonComponent from '@/components/UnitsButtonComponent.vue'

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
// Estadísticas locales
// ===============================
const stats = ref(null)

// ===============================
// Label para botón de unidades
// ===============================
const unitsLabel = computed(() =>
  weatherStore.units === 'metric' ? 'Cambiar a °F' : 'Cambiar a °C'
)

// ===============================
// Cargar datos al iniciar
// ===============================
onMounted(async () => {
  weatherStore.setCity(city.value)
  await weatherStore.fetchWeather()
  await weatherStore.fetchWeekly()
  calcularEstadisticas()
})

// ===============================
// Calcular estadísticas
// ===============================
function calcularEstadisticas() {
  const list = weatherStore.weekly
  if (!list || list.length === 0) return

  const temps = list.map(item => item.main.temp)

  const min = Math.min(...temps)
  const max = Math.max(...temps)
  const prom = temps.reduce((a, b) => a + b, 0) / temps.length

  stats.value = {
    min: Math.round(min),
    max: Math.round(max),
    prom: Math.round(prom)
  }
}

// ===============================
// Cambiar unidades
// ===============================
async function toggleUnits() {
  weatherStore.toggleUnits()
  await weatherStore.fetchWeather()
  await weatherStore.fetchWeekly()
  calcularEstadisticas()
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

  <button class="back-btn" @click="volver">
    ← Volver
  </button>

  <h1 class="mb-4 text-center">Detalles de {{ city }}</h1>

  <!-- ERROR -->
  <p v-if="weatherStore.error" class="text-danger text-center">
    {{ weatherStore.error }}
  </p>

  <!-- LOADING -->
  <p v-if="weatherStore.loading" class="text-center">
    Cargando clima...
  </p>

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

  <!-- BOTÓN DE UNIDADES -->
  <div class="text-center mt-3">
    <UnitsButtonComponent :label="unitsLabel" @click="toggleUnits" />
  </div>

  <!-- PRONÓSTICO SEMANAL -->
  <WeatherWeekly
    v-if="weatherStore.weekly && weatherStore.weekly.length"
    :data="weatherStore.weekly"
    :units="weatherStore.units"
    class="mt-4"
  />

  <!-- ESTADÍSTICAS -->
  <section v-if="stats" class="mt-4 text-center">
    <h2>Estadísticas de la semana</h2>

    <div class="row mt-3">
      <div class="col">
        <div class="card p-3">
          <h4>Mínima</h4>
          <p class="fs-3">{{ stats.min }}°</p>
        </div>
      </div>

      <div class="col">
        <div class="card p-3">
          <h4>Promedio</h4>
          <p class="fs-3">{{ stats.prom }}°</p>
        </div>
      </div>

      <div class="col">
        <div class="card p-3">
          <h4>Máxima</h4>
          <p class="fs-3">{{ stats.max }}°</p>
        </div>
      </div>
    </div>
  </section>

</main>
</template>

<style scoped>
</style>


