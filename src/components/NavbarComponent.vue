<!-- src/components/NavbarComponent.vue -->
<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useWeatherStore } from '@/stores/weatherStore'
import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'

const userStore = useUserStore()
const weatherStore = useWeatherStore()

const isLogged = computed(() => userStore.user !== null)

function cerrarSesion() {
  userStore.logout()
}
</script>

<template>
  <nav :class="['l-header__nav', weatherStore.theme, 'container']">
    <h2 class="l-header__logo">🌤️ BioClima</h2>

    <div class="l-header__links">
      <RouterLink to="/" class="l-header__link">Home</RouterLink>
      <RouterLink to="/about" class="l-header__link">About</RouterLink>

      <template v-if="!isLogged">
        <RouterLink to="/login" class="l-header__link">Login</RouterLink>
        <RouterLink to="/registro" class="l-header__link">Registro</RouterLink>
      </template>

      <template v-else>
        <RouterLink to="/favoritos" class="l-header__link">Favoritos</RouterLink>
        <RouterLink to="/preferencias" class="l-header__link">Preferencias</RouterLink>

        <button class="l-header__link btn-link" @click="cerrarSesion">
          Cerrar sesión
        </button>
      </template>
    </div>

    <ThemeSwitcherComponent />
  </nav>
</template>

<style scoped></style>
