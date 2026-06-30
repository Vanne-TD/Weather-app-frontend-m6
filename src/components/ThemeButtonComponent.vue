<script setup>
import { computed } from "vue"
import { useWeatherStore } from "@/stores/weatherStore"

const weatherStore = useWeatherStore()

// Texto dinámico según el tema
const label = computed(() =>
  weatherStore.theme === "light"
    ? "🌙 Modo oscuro"
    : "☀️ Modo claro"
)
</script>

<template>
  <button class="theme-toggle" @click="weatherStore.toggleTheme()">
    {{ label }}
  </button>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

// Botón estilizado con tus variables
.theme-toggle {
  padding: $space-sm $space-md;
  border-radius: $radius-sm;
  border: none;
  cursor: pointer;

  font-family: $font-family-heading;
  font-weight: $font-weight-bold;
  font-size: 1rem;

  background: $color-accent;
  color: $color-white;

  box-shadow: $shadow-medium;
  transition: all 0.25s ease;

  &:hover {
    background: lighten($color-accent, 10%);
    transform: translateY(-2px);
    box-shadow: $shadow-dark;
  }

  &:active {
    transform: translateY(0);
    box-shadow: $shadow-light;
  }
}
</style>
