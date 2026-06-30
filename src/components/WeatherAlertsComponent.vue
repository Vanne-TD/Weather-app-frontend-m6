<!-- src/components/WeatherAlertsComponent.vue -->
<script setup>
import { useWeatherStore } from "@/stores/weatherStore"

const weatherStore = useWeatherStore()

</script>

<template>
  <section class="alerts" v-if="weatherStore.filteredAlerts().length">
    <h2 class="alerts__title">Alertas del clima</h2>

    <ul class="alerts__list">
      <li
        v-for="alert in weatherStore.filteredAlerts()"
        :key="alert"
        class="alerts__item"
      >
        {{ alert }}
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/styles/themes/_theme-variables" as *;

.alerts {
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  margin-top: auto;
  margin:auto;

  .light & {
    background-color: $light-card;
    color: $light-text;
  }

  .dark & {
    background-color: $dark-card;
    color: $dark-text;
  }
}

.alerts__title {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.alerts__item {
  padding: 0.5rem 0;
  font-weight: 600;
}
</style>
