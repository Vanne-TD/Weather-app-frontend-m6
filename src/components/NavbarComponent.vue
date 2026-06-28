<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Saber si la usuaria está logueada
const isLogged = computed(() => store.state.user !== null)

function cerrarSesion() {
  store.commit('logout')
}
</script>

<template>
  <nav class="l-header__nav container">
    <h2 class="l-header__logo">🌤️ BioClima</h2>

    <div class="l-header__links">

      <RouterLink to="/" class="l-header__link">Home</RouterLink>
      <RouterLink to="/about" class="l-header__link">About</RouterLink>

      <!-- ⭐ Si NO está logueada -->
      <template v-if="!isLogged">
        <RouterLink to="/login" class="l-header__link">Login</RouterLink>
        <RouterLink to="/registro" class="l-header__link">Registro</RouterLink>
      </template>

      <!-- ⭐ Si SÍ está logueada -->
      <template v-else>
        <RouterLink to="/favoritos" class="l-header__link">Favoritos</RouterLink>
        <RouterLink to="/preferencias" class="l-header__link">Preferencias</RouterLink>

        <button class="l-header__link btn-link" @click="cerrarSesion">
          Cerrar sesión
        </button>
      </template>

    </div>
  </nav>
</template>

<style scoped>

</style>
