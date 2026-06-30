<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWeatherStore } from '@/stores/weatherStore'

import WeatherWeekly from '@/components/WeatherWeeklyComponent.vue'
import WeatherDetailsCardComponent from '@/components/WeatherDetailsCardComponent.vue'
import UnitsButtonComponent from '@/components/UnitsButtonComponent.vue'
import WeatherStatusComponent from '@/components/WeatherStatusComponent.vue'
import WeatherAlertsComponent from '@/components/WeatherAlertsComponent.vue'

const route = useRoute()
const router = useRouter()
const weatherStore = useWeatherStore()

const id = ref(route.params.id)

const stats = computed(() => weatherStore.stats)

const unitsLabel = computed(() =>
  weatherStore.units === 'metric' ? 'Cambiar a °F' : 'Cambiar a °C'
)

onMounted(async () => {
  await weatherStore.fetchWeatherById(id.value)
  await weatherStore.fetchWeeklyById(id.value)
})

async function toggleUnits() {
  weatherStore.toggleUnits()
  await weatherStore.fetchWeatherById(id.value)
  await weatherStore.fetchWeeklyById(id.value)
}

function volver() {
  router.push('/')
}
</script>

<template>
  <main class="container py-4 detail-page">

    <button class="back-btn" @click="volver">
      ← Volver
    </button>

    <h1 class="mb-4 text-center">
      Detalles de {{ weatherStore.weather?.name }}
    </h1>

    <p v-if="weatherStore.error" class="text-danger text-center">
      {{ weatherStore.error }}
    </p>

    <p v-if="weatherStore.loading" class="text-center">
      Cargando clima...
    </p>

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

    <div class="text-center mt-3">
      <UnitsButtonComponent :label="unitsLabel" @click="toggleUnits" />
    </div>

    <WeatherWeekly
      v-if="weatherStore.weekly && weatherStore.weekly.length"
      :data="weatherStore.weekly"
      :units="weatherStore.units"
      class="mt-4"
    />

    <section v-if="stats" class="mt-4 text-center">
      <h2>Estadísticas de la semana</h2>

      <WeatherStatusComponent :stats="stats" />
      
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

    <WeatherAlertsComponent
      v-if="weatherStore.alerts && weatherStore.alerts.length"
      :alerts="weatherStore.alerts"
      class="mt-4"
    />

  </main>
</template>
<style scoped></style>