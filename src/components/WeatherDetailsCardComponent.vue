<!-- src/components/WeatherDetailsCardComponent.vue -->
<script setup>
function capitalizar(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// defineProps({
//   weather: {
//     type: Object,
//     required: true
//   }
// })

defineProps({
  weather: Object,
  units: String,
});
</script>

<template>
  <div class="weather-details-card H">
    <h2 class="weather-details-card__title">
      {{ capitalizar(weather.description) }}
    </h2>

    <img
      :src="weather.icon"
      alt="Icono del clima"
      class="weather-details-card__icon"
    />

    <p class="weather-details-card__temp">
      {{ weather.temp }}°{{ units === "metric" ? "C" : "F" }}
    </p>

    <div class="weather-details-card__info">
      <p>Humedad: <strong>{{ weather.humidity }}%</strong></p>
      <p>Viento: <strong>{{ weather.wind }} km/h</strong></p>
      <p>Presión: <strong>{{ weather.pressure }} hPa</strong></p>
      <p>Sensación térmica: <strong>{{ weather.feels_like }}°</strong></p>
    </div>
  </div>
</template>

<style></style>


<style scoped lang="scss">
</style>
