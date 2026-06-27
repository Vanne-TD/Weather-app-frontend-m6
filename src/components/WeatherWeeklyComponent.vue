<script setup>
import { computed } from "vue";

const props = defineProps({
  data: Array,
  units: String
})

// Agrupar por día y tomar solo el registro de las 12:00
const diasFiltrados = computed(() => {
  const porDia = {};

  props.data.forEach((item) => {
    const [fecha, hora] = item.dt_txt.split(" "); // "2024-06-26", "12:00:00"

    // Guardar solo el registro de las 12:00
    if (hora === "12:00:00") {
      porDia[fecha] = item;
    }
  });

  // Convertir a array y tomar solo 5 días
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
  <section class="weather-weekly">
    <h2 class="weather-weekly__title">Pronóstico 5 días</h2>

    <div class="weather-weekly__grid">
      <div
        v-for="dia in diasFiltrados"
        :key="dia.dt"
        class="weather-weekly__day"
      >
        <span class="weather-weekly__weekday">
          {{ formatearDia(dia.dt_txt) }}
        </span>

        <img
          class="weather-weekly__icon"
          :src="`https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`"
          alt="icono clima"
        />

        <span class="weather-weekly__temp">
          {{ Math.round(dia.main.temp) }}°{{ units === "metric" ? "C" : "F" }}
        </span>

        <span class="weather-weekly__desc text-capitalize">
          {{ dia.weather[0].description }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
