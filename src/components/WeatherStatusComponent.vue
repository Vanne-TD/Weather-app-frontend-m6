<script setup>
const props = defineProps({
  stats: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="weather-stats" v-if="props.stats">
    <!-- <h3 class="weather-stats__subtitle">Indicadores semanales</h3> -->

    <ul class="weather-stats__list">
      <li>🌡️ Temperatura mínima: {{ props.stats.min }}°</li>
      <li>🔥 Temperatura máxima: {{ props.stats.max }}°</li>
      <li>📈 Promedio de temperatura: {{ props.stats.prom }}°</li>
      <li>💧 Humedad promedio: {{ props.stats.avgHumidity }}%</li>
      <li>🌧️ Días con lluvia: {{ props.stats.rainyDays }}</li>
      <li>☀️ Días despejados: {{ props.stats.clearDays }}</li>
      <li>💨 Días con viento fuerte: {{ props.stats.windyDays }}</li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.weather-stats {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #b889f163;
  border-radius: 12px;
}
.weather-stats__title {
  margin-bottom: 1rem;
}
.weather-stats__list {
  list-style: none;
  padding: 0;
  line-height: 1.8;
}
</style>
