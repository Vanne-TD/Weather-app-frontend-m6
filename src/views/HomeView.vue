<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { getCurrentWeather, getForecast } from '../api/weatherApi'
import WeatherCardComponent from '../components/WeatherCardComponent.vue'
import UnitsButtonComponent from '../components/UnitsButtonComponent.vue'

// ⭐ Vuex
const store = useStore()

// ⭐ Unidades según usuario logueado
const units = ref(store.state.user?.preferences?.units || 'metric')

const city = ref('Santiago')
const cityTitle = ref('Santiago')
const weather = ref(null)
const forecast = ref(null)
const errorMsg = ref('')

onMounted(() => {
  buscarClima()
})

async function buscarClima() {
  try {
    errorMsg.value = ''
    weather.value = await getCurrentWeather(city.value, units.value)
    forecast.value = await getForecast(city.value, units.value)

    cityTitle.value = city.value

  } catch (error) {
    errorMsg.value = 'Ciudad no encontrada'
  }
}

function toggleUnits() {
  units.value = units.value === 'metric' ? 'imperial' : 'metric'

  // ⭐ Guardar preferencia en Vuex
  if (store.state.isAuthenticated) {
    store.commit('updatePreferences', { units: units.value })
  }

  buscarClima()
}
</script>

<template>
  <main class="container py-4">

    <h1 class="mb-4 text-center">Clima en {{ cityTitle }}</h1>

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

    <div class="text-center mb-3">
      <!-- <button class="btn units-btn" @click="toggleUnits">
        Cambiar a {{ units === 'metric' ? '°F' : '°C' }}
      </button> -->
      <UnitsButtonComponent :label="units === 'metric' ? 'Cambiar a °F' : 'Cambiar a °C'" @click="toggleUnits" />

    </div>

    <p v-if="errorMsg" class="text-danger text-center">{{ errorMsg }}</p>

    <WeatherCardComponent
      v-if="weather"
      :data="weather"
      :units="units"
    />

  </main>
</template>

<style scoped>
</style>
