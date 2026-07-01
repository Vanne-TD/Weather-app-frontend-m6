<!-- src/components/WeatherStatsComponent.vue -->
<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section class="weather-stats">
    <h2 class="weather-stats__title">Estadísticas de la semana</h2>

    <div class="row g-3">
      <div class="col-12 col-sm-4">
        <div class="weather-stats__card">
          <h4>Mínima</h4>
          <p class="weather-stats__value">{{ stats.min }}°</p>
        </div>
      </div>

      <div class="col-12 col-sm-4">
        <div class="weather-stats__card">
          <h4>Promedio</h4>
          <p class="weather-stats__value">{{ stats.prom }}°</p>
        </div>
      </div>

      <div class="col-12 col-sm-4">
        <div class="weather-stats__card">
          <h4>Máxima</h4>
          <p class="weather-stats__value">{{ stats.max }}°</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
