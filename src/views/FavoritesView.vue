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
  <main class="container py-4 favorites-view">
    <h1 class="mb-4">Mis lugares favoritos</h1>

    <div class="favorites-card">
      <ul>
        <li v-for="city in favorites" :key="city">{{ city }}</li>
      </ul>
    </div>
  </main>
</template>

<style scoped lang="scss">
.favorites-view h1 {
  color: var(--main-text);
}

.favorites-card {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  color: var(--main-text);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}
</style>

