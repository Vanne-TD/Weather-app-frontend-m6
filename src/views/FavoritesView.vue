<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const favorites = computed(() => store.state.user.favorites)
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
