<!-- src/components/WeatherStatusComponent.vue -->
<script setup>
defineProps({
  stats: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section class="weather-status" v-if="stats">
    <h2 class="weather-status__title">Indicadores semanales</h2>

    <div class="weather-status__grid">

      <div class="weather-status__item">
        <img class="weather-status__icon" src="https://cdn-icons-png.flaticon.com/512/1684/1684375.png" alt="min temp" />
        <span class="weather-status__label">Temperatura mínima</span>
        <span class="weather-status__value">{{ stats.min }}°</span>
      </div>

      <div class="weather-status__item">
        <img class="weather-status__icon" src="https://cdn-icons-png.flaticon.com/512/1684/1684376.png" alt="max temp" />
        <span class="weather-status__label">Temperatura máxima</span>
        <span class="weather-status__value">{{ stats.max }}°</span>
      </div>

      <div class="weather-status__item">
        <img class="weather-status__icon" src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="avg temp" />
        <span class="weather-status__label">Promedio de temperatura</span>
        <span class="weather-status__value">{{ stats.prom }}°</span>
      </div>

      <div class="weather-status__item">
        <img class="weather-status__icon" src="https://cdn-icons-png.flaticon.com/512/414/414974.png" alt="humidity" />
        <span class="weather-status__label">Humedad promedio</span>
        <span class="weather-status__value">{{ stats.avgHumidity }}%</span>
      </div>

      <div class="weather-status__item">
        <img class="weather-status__icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png" alt="rainy days" />
        <span class="weather-status__label">Días con lluvia</span>
        <span class="weather-status__value">{{ stats.rainyDays }}</span>
      </div>

      <div class="weather-status__item">
        <img class="weather-status__icon" src="https://cdn-icons-png.flaticon.com/512/869/869869.png" alt="clear days" />
        <span class="weather-status__label">Días despejados</span>
        <span class="weather-status__value">{{ stats.clearDays }}</span>
      </div>

      <div class="weather-status__item">
        <img class="weather-status__icon" src="https://cdn-icons-png.flaticon.com/512/4834/4834559.png" alt="windy days" />
        <span class="weather-status__label">Días con viento fuerte</span>
        <span class="weather-status__value">{{ stats.windyDays }}</span>
      </div>

    </div>
  </section>
</template>

<style></style>
