<!-- src/components/WeatherCardComponent.vue -->
<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: Object,
  units: String
})

const temperatura = computed(() => Math.round(props.data.main.temp))

const icono = computed(() =>
  `https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`
)

const unidad = computed(() =>
  props.units === 'metric' ? '°C' : '°F'
)
</script>

<template>
  <article class="weather-card weather-card--bg">
    <div class="weather-card__content">

      <h2 class="weather-card__city">{{ data.name }}</h2>

      <img :src="icono" alt="icono clima" class="weather-card__icon weather-card__icon--rounded" />

      <p class="weather-card__temp-display">
        {{ temperatura }}{{ unidad }}
      </p>

      <p class="weather-card__desc text-capitalize">
        {{ data.weather[0].description }}
      </p>

      <div class="weather-card__stats">
        <div class="weather-card__stat">
          <p class="weather-card__stat-label">Humedad</p>
          <p class="weather-card__stat-value">{{ data.main.humidity }}%</p>
        </div>

        <div class="weather-card__stat">
          <p class="weather-card__stat-label">Viento</p>
          <p class="weather-card__stat-value">{{ data.wind.speed }} km/h</p>
        </div>
      </div>

      <button class="weather-card__button" @click="$router.push(`/detalle/${data.id}`)" type="button">
        Ver detalles
      </button>

    </div>
  </article>
</template>

<style scoped lang="scss"></style>
