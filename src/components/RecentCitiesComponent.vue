<!-- src/components/RecentCitiesComponent.vue -->
<script setup>
import { useWeatherStore } from "@/stores/weatherStore"
import { useRouter } from "vue-router"

const weatherStore = useWeatherStore()
const router = useRouter()

function verCiudad(nombre) {
  router.push(`/detalle/${nombre}`)
}
</script>

<template>
  <section
    class="recent-cities"
    v-if="weatherStore.recentCities.length"
  >
    <h2 class="recent-cities__title">Últimas ciudades buscadas</h2>

    <ul class="recent-cities__list">
      <li
        v-for="city in weatherStore.recentCities"
        :key="city"
        class="recent-cities__item"
        @click="verCiudad(city)"
      >
        {{ city }}
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">

</style>
