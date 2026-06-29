<script setup>
import { ref, onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import WeatherCardComponent from '@/components/WeatherCardComponent.vue'
import UnitsButtonComponent from '@/components/UnitsButtonComponent.vue'

// ⭐ PINIA STORE
const weatherStore = useWeatherStore()

// ⭐ Estados locales (solo para input y título)
const city = ref('Santiago')
const cityTitle = ref('Santiago')

// ⭐ Cargar clima al montar
onMounted(() => {
  weatherStore.setCity(city.value)
  weatherStore.fetchWeather()
  weatherStore.fetchWeekly()
})

// ⭐ Buscar clima
async function buscarClima() {
  try {
    weatherStore.error = null
    weatherStore.setCity(city.value)

    await weatherStore.fetchWeather()
    await weatherStore.fetchWeekly()

    cityTitle.value = city.value
  } catch (error) {
    weatherStore.error = 'Ciudad no encontrada'
  }
}

// ⭐ Cambiar unidades (°C / °F)
function toggleUnits() {
  weatherStore.toggleUnits()

  // ⭐ Volver a cargar clima con nuevas unidades
  weatherStore.fetchWeather()
  weatherStore.fetchWeekly()
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
