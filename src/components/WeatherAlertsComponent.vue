<!-- src/components/WeatherAlertsComponent.vue -->
<script setup>
import { ref } from "vue"
import { useWeatherStore } from "@/stores/weatherStore"

const weatherStore = useWeatherStore()

const open = ref(false)
const toggle = () => open.value = !open.value

// Contenido completo de la alerta
const getAlertContent = (alert) => {
  if (typeof alert === "string") return alert
  return alert.description || alert.event || alert
}

// Ícono dinámico
const getAlertIcon = (alert) => {
  const text = typeof alert === "string" ? alert.toLowerCase() : alert.event?.toLowerCase()

  if (!text) return "https://cdn-icons-png.flaticon.com/512/564/564619.png"
  if (text.includes("tormenta")) return "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"
  if (text.includes("viento")) return "https://cdn-icons-png.flaticon.com/512/4834/4834559.png"
  if (text.includes("lluvia")) return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
  if (text.includes("calor")) return "https://cdn-icons-png.flaticon.com/512/1684/1684376.png"
  if (text.includes("frío")) return "https://cdn-icons-png.flaticon.com/512/1684/1684375.png"

  return "https://cdn-icons-png.flaticon.com/512/564/564619.png"
}
</script>

<template>
  <section class="alerts" v-if="weatherStore.filteredAlerts().length">
    
    <div class="alerts__item" @click="toggle">
      <div class="alerts__header">
        <img
          class="alerts__icon"
          :src="getAlertIcon(weatherStore.filteredAlerts()[0])"
          alt="alert icon"
        />
        <span class="alerts__label">Alertas</span>
      </div>

      <transition name="fade">
        <div v-if="open" class="alerts__content">
          <p>{{ getAlertContent(weatherStore.filteredAlerts()[0]) }}</p>
        </div>
      </transition>
    </div>

  </section>
</template>

<style scoped></style>
