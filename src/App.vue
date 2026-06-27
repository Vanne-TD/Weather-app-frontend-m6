<script setup>
import HeaderLayout from './layout/HeaderLayout.vue'
import FooterLayout from './layout/FooterLayout.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">

    <HeaderLayout />

    <main class="flex-grow-1">
      <RouterView />
    </main>

    <FooterLayout />

  </div>
</template>

<style scoped>
main {
  padding-top: 20px;
}
</style>
