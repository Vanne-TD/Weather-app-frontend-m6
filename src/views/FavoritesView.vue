<!-- src/views/FavoritesView.vue -->
<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'

// ⭐ Pinia store
const userStore = useUserStore()

// ⭐ Computed con Pinia
const favorites = computed(() => userStore.user?.favorites || [])
</script>

<template>
  <main class="container py-4">
    <h1 class="mb-4">Mis lugares favoritos</h1>

    <ul>
      <li v-for="city in favorites" :key="city">{{ city }}</li>
    </ul>
  </main>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
