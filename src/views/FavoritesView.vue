<!-- src/views/FavoritesView.vue -->
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const favorites = computed(() => userStore.favorites)

function abrirCiudad(city) {
  router.push(`/detalle/${encodeURIComponent(city)}`)
}

function quitarFavorito(city) {
  userStore.removeFavorite(city)
}
</script>

<template>
  <main class="container py-4 favorites-view">
    <h1 class="mb-4">Mis lugares favoritos</h1>

    <div class="favorites-card">
      <p v-if="!favorites.length" class="empty-state">
        Aún no tienes ciudades guardadas como favoritas.
      </p>

      <ul v-else>
        <li v-for="city in favorites" :key="city">
          <button class="city-link" @click="abrirCiudad(city)">{{ city }}</button>
          <button class="remove-btn" @click="quitarFavorito(city)">Eliminar</button>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>

