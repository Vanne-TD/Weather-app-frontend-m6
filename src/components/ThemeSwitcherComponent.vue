<!-- src/components/ThemeSwitcherComponent.vue -->
<script setup>
import { computed } from "vue"
import { useWeatherStore } from "@/stores/weatherStore"

const weatherStore = useWeatherStore()

// Lista de temas disponibles (fácil de extender)
const themes = [
  { id: "light", label: "Claro", icon: "☀️" },
  { id: "dark", label: "Oscuro", icon: "🌙" },
]

// Tema actual
const currentTheme = computed(() => weatherStore.theme)

// Cambiar tema
const setTheme = (theme) => {
  weatherStore.theme = theme
  localStorage.setItem("theme", theme)
}
</script>

<template>
  <div class="theme-switcher">
    <h3 class="title">Tema</h3>

    <div class="options">
      <div v-for="t in themes" :key="t.id" class="option" :class="{ active: currentTheme === t.id }"
        @click="setTheme(t.id)">
        <span class="icon">{{ t.icon }}</span>
        <span class="label">{{ t.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
