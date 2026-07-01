<!-- src/components/WeatherWeeklyComponent.vue -->

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: Array,
  units: String
});

// Agrupar por día y tomar solo el registro de las 12:00
const diasFiltrados = computed(() => {
  const porDia = {};

  props.data.forEach((item) => {
    const [fecha] = item.dt_txt.split(" ");

    if (!porDia[fecha]) {
      porDia[fecha] = item;
    }
  });

  return Object.values(porDia).slice(0, 5);
});

// Formatear día en español
function formatearDia(fecha) {
  return new Date(fecha).toLocaleDateString("es-CL", {
    weekday: "short",
  });
}
</script>

<template>
  <section class="weather-weekly container h-100">
    <div class="weather-weekly__wrapper">
      <h2 class="weather-weekly__title">Pronóstico 5 días</h2>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        <div v-for="dia in diasFiltrados" :key="dia.dt" class="col">
          <div class="weather-weekly__day">
            <span class="weather-weekly__weekday">
              {{ formatearDia(dia.dt_txt) }}
            </span>

            <div class="weather-weekly__icon-wrapper">
              <img class="weather-weekly__icon" :src="`https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`"
                alt="icono clima" />
            </div>


            <span class="weather-weekly__temp">
              {{ Math.round(dia.main.temp) }}°{{ units === "metric" ? "C" : "F" }}
            </span>

            <span class="weather-weekly__desc text-capitalize">
              {{ dia.weather[0].description }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss"></style>
