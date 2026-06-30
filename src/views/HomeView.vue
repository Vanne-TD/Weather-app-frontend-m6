<script setup>
import { ref, onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import WeatherCardComponent from '@/components/WeatherCardComponent.vue'
import UnitsButtonComponent from '@/components/UnitsButtonComponent.vue'

// ⭐ PINIA STORE
const weatherStore = useWeatherStore()

// ⭐ Estados locales
const city = ref('Santiago')
const cityTitle = ref('Santiago')

// ⭐ Cargar clima inicial usando ID
onMounted(async () => {
  await buscarClima()
})

// ⭐ Buscar clima (por nombre → obtener ID → cargar por ID)
async function buscarClima() {
  try {
    weatherStore.error = null

    // 1) Buscar ciudad por nombre (esto devuelve el ID)
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`
    const response = await fetch(url)

    if (!response.ok) {
      weatherStore.error = 'Ciudad no encontrada'
      return
    }

    const data = await response.json()

    // 2) Guardar ID en el store
    weatherStore.cityId = data.id
    cityTitle.value = data.name

    // 3) Cargar clima usando ID (rápido)
    await weatherStore.fetchWeatherById(data.id)
    await weatherStore.fetchWeeklyById(data.id)

  } catch (error) {
    weatherStore.error = 'No se pudo obtener el clima'
  }
}

// ⭐ Cambiar unidades
async function toggleUnits() {
  weatherStore.toggleUnits()

  // Recargar usando ID
  await weatherStore.fetchWeatherById(weatherStore.cityId)
  await weatherStore.fetchWeeklyById(weatherStore.cityId)
}
</script>

<template>
  <main class="container py-4">

    <h1 class="mb-4 text-center">Clima en {{ cityTitle }}</h1>

    <!-- BUSCADOR -->
    <div class="input-group mb-3">
      <input
        v-model="city"
        @keyup.enter="buscarClima"
        type="text"
        class="form-control"
        placeholder="Buscar ciudad..."
      />
      <button class="btn btn-primary" @click="buscarClima">Buscar</button>
    </div>

    <!-- BOTÓN DE UNIDADES -->
    <div class="text-center mb-3">
      <UnitsButtonComponent
        :label="weatherStore.units === 'metric' ? 'Cambiar a °F' : 'Cambiar a °C'"
        @click="toggleUnits"
      />
    </div>

    <!-- ERROR -->
    <p v-if="weatherStore.error" class="text-danger text-center">
      {{ weatherStore.error }}
    </p>

    <!-- LOADING -->
    <p v-if="weatherStore.loading" class="text-center">
      Cargando clima...
    </p>

    <!-- TARJETA DE CLIMA -->
    <WeatherCardComponent
      v-if="weatherStore.weather"
      :data="weatherStore.weather"
      :units="weatherStore.units"
    />

  </main>
</template>

<style scoped>
</style>
