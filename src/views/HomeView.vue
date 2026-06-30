<!-- src/views/HomeView.vue -->
<script setup>
import { ref } from "vue"
import { useWeatherStore } from "@/stores/weatherStore"
import WeatherCardComponent from "@/components/WeatherCardComponent.vue"
import RecentCitiesComponent from "@/components/RecentCitiesComponent.vue"
import { useRouter } from "vue-router"

const weatherStore = useWeatherStore()
const router = useRouter()

const cityName = ref("")
const errorMsg = ref("")

async function buscarCiudad() {
  if (!cityName.value) {
    errorMsg.value = "Ingresa una ciudad"
    return
  }

  errorMsg.value = ""

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=${weatherStore.units}`

    const res = await fetch(url)
    const data = await res.json()

    if (data.cod !== 200) {
      errorMsg.value = "Ciudad no encontrada"
      return
    }

    weatherStore.addRecentCity(data.name)

    await weatherStore.fetchWeatherById(data.id)
    await weatherStore.fetchWeeklyById(data.id)
  } catch (err) {
    errorMsg.value = "Error al buscar ciudad"
  }
}

function irFavorita() {
  if (weatherStore.favoriteCity) {
    router.push(`/detalle/${weatherStore.favoriteCity}`)
  }
}

function normalizarCiudad(nombre) {
  return nombre
    .normalize("NFD")                // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-zA-Z0-9 ]/g, "")   // elimina caracteres raros
    .trim()
}

</script>

<template>
  <main class="container py-4">
    <h1 class="mb-4">Buscar clima</h1>

    <button
      v-if="weatherStore.favoriteCity"
      class="btn btn-outline-warning mb-3"
      @click="irFavorita"
    >
      ⭐ Ir a mi ciudad favorita ({{ weatherStore.favoriteCity }})
    </button>

    <form @submit.prevent="buscarCiudad" class="mb-4">
      <input
        v-model="cityName"
        type="text"
        class="form-control mb-2"
        placeholder="Ingresa una ciudad"
      />
      <button class="btn btn-primary w-100">Buscar</button>
      <p v-if="errorMsg" class="text-danger mt-2">{{ errorMsg }}</p>
    </form>

    <WeatherCardComponent
      v-if="weatherStore.weather"
      :data="weatherStore.weather"
      :units="weatherStore.units"
    />

    <RecentCitiesComponent />
  </main>
</template>

<style scoped></style>
