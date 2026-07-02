<!-- src/components/WeatherAlertsComponent.vue -->
<script setup>
import { ref, computed } from "vue"
import { useWeatherStore } from "@/stores/weatherStore"

const weatherStore = useWeatherStore()
const filteredAlerts = computed(() => weatherStore.filteredAlerts())

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
  <section class="alerts">
    
    <div class="alerts__item" @click="toggle">
      <div class="alerts__header">
        <img
          class="alerts__icon"
          :src="getAlertIcon(filteredAlerts[0] || 'Sin alertas activas')"
          alt="alert icon"
        />
        <span class="alerts__label">Alertas</span>
      </div>

      <transition name="fade">
        <div v-if="open" class="alerts__content">
          <p v-if="filteredAlerts.length">{{ getAlertContent(filteredAlerts[0]) }}</p>
          <p v-else>Sin alertas activas para esta ciudad segun el pronostico y tus preferencias.</p>
        </div>
      </transition>
    </div>

  </section>
</template>

<style scoped></style>
