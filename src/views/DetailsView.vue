
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCurrentWeather, getForecast } from '../api/weatherApi'

import WeatherWeekly from '@/components/WeatherWeeklyComponent.vue'
import WeatherDetailsCardComponent from '@/components/WeatherDetailsCardComponent.vue'

// ===============================
// Refs y rutas
// ===============================
const route = useRoute()
const router = useRouter()

const city = ref(route.params.city)
const units = ref('metric')

const weather = ref(null)
const weatherData = ref(null)
const forecast = ref(null)
const stats = ref(null)
const errorMsg = ref('')

// ===============================
// Cargar datos al iniciar
// ===============================
onMounted(() => {
  cargarDatos()
})

// ===============================
// Cargar clima + pronóstico
// ===============================
async function cargarDatos() {
  try {
    errorMsg.value = ''

    // Clima actual
    weather.value = await getCurrentWeather(city.value, units.value)

    // Transformar datos para la tarjeta PRO
    weatherData.value = {
      description: weather.value.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${weather.value.weather[0].icon}@2x.png`,
      temp: Math.round(weather.value.main.temp),
      humidity: weather.value.main.humidity,
      wind: weather.value.wind.speed,
      pressure: weather.value.main.pressure,
      feels_like: Math.round(weather.value.main.feels_like)
    }

    // Pronóstico
    forecast.value = await getForecast(city.value, units.value)

    calcularEstadisticas()

  } catch (error) {
    errorMsg.value = 'No se pudo cargar el clima'
  }
}

// ===============================
// Calcular estadísticas
// ===============================
function calcularEstadisticas() {
  if (!forecast.value || !forecast.value.list) return

  const temps = forecast.value.list.map(item => item.main.temp)

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
function toggleUnits() {
  units.value = units.value === 'metric' ? 'imperial' : 'metric'
  cargarDatos()
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

  <p v-if="errorMsg" class="text-danger text-center">{{ errorMsg }}</p>

  <WeatherDetailsCardComponent
  v-if="weatherData"
  :weather="weatherData"
  :units="units"
/>



  <div class="text-center mt-3">
    <button class="units-btn" @click="toggleUnits">
      Cambiar a {{ units === 'metric' ? '°F' : '°C' }}
    </button>
  </div>

  <WeatherWeekly
    v-if="forecast && forecast.list"
    :data="forecast.list"
    :units="units"
    class="mt-4"
  />

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

<style>

</style>



