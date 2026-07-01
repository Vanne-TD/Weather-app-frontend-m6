<!-- src/views/HomeView.vue -->
<script setup>
import { ref, computed } from "vue"
import { useWeatherStore } from "@/stores/weatherStore"
import WeatherCardComponent from "@/components/WeatherCardComponent.vue"
import UnitsButtonComponent from "@/components/UnitsButtonComponent.vue"
import RecentCitiesComponent from "@/components/RecentCitiesComponent.vue"
import { useRouter } from "vue-router"

const weatherStore = useWeatherStore()
const router = useRouter()

const cityName = ref("")
const errorMsg = ref("")

// ⭐ Label dinámico para el botón
const unitsLabel = computed(() =>
  weatherStore.units === "metric" ? "°C" : "°F"
)

// ⭐ Toggle de unidades
async function toggleUnits() {
  weatherStore.toggleUnits()

  // Si ya hay clima cargado → recargar con nuevas unidades
  if (weatherStore.weather) {
    const city = weatherStore.weather.name
    await weatherStore.fetchWeatherByName(city)
    await weatherStore.fetchWeeklyByName(city)
  }
}

async function buscarCiudad() {
  if (!cityName.value.trim()) {
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
</script>


<template>
  <main class="home-page container py-4">

    <!-- TÍTULO -->
    <h1 class="home-page__title">Buscar clima</h1>

    <!-- BOTÓN FAVORITA -->
    <button v-if="weatherStore.favoriteCity" class="favorite-btn mb-3" @click="irFavorita">
      ⭐ Ir a mi ciudad favorita ({{ weatherStore.favoriteCity }})
    </button>

    <!-- BUSCADOR -->
    <form @submit.prevent="buscarCiudad" class="search-box mb-4">

      <input v-model="cityName" type="text" placeholder="Ingresa una ciudad" />

      <button class="search-btn" type="submit">
        Buscar
      </button>

      <div v-if="errorMsg" class="error-msg">
        {{ errorMsg }}
      </div>
    </form>

    <!-- CARD DEL CLIMA -->
    <WeatherCardComponent v-if="weatherStore.weather" :data="weatherStore.weather" :units="weatherStore.units" />

    <div class="text-center mt-3">
      <UnitsButtonComponent :label="unitsLabel" @click="toggleUnits" />
    </div>



    <!-- CIUDADES RECIENTES -->
    <RecentCitiesComponent />

  </main>
</template>

<style scoped></style>
