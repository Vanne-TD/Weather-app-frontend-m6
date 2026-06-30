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
@use "@/assets/styles/abstracts/_variables" as *;
@use "@/assets/styles/abstracts/_mixins" as *;
@use "@/assets/styles/themes/_theme-variables" as *;

/* CONTENEDOR PRINCIPAL */
.recent-cities {
  @include card-surface($color-panel-soft, $radius-base, $shadow-light);
  @include section-spacing($space-md, $space-md);

  /* Tema claro */
  .light & {
    background-color: $light-card;
    color: $light-text;
  }

  /* Tema oscuro */
  .dark & {
    background-color: $dark-card;
    color: $dark-text;
  }
}

/* TÍTULO */
.recent-cities__title {
  font-family: $font-family-heading;
  font-weight: $font-weight-bold;
  margin-bottom: $space-sm;
  @include responsive-type(1rem, 2vw, 1.6rem);
}

/* LISTA */
.recent-cities__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* ITEM */
.recent-cities__item {
  padding: $space-sm 0;
  cursor: pointer;
  font-weight: $font-weight-bold;
  transition: 0.2s ease;

  /* Tema claro */
  .light & {
    color: $color-text;
  }

  /* Tema oscuro */
  .dark & {
    color: $color-text-soft;
  }

  &:hover {
    color: $color-accent;
    transform: translateX(4px);
  }
}
</style>
