<script setup>
import HeaderComponent from './layout/HeaderComponent.vue'
import FooterComponent from './layout/FooterComponent.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">

    <HeaderComponent />

    <main class="flex-grow-1">
      <RouterView />
    </main>

    <FooterComponent />

  </div>
</template>

<style scoped lang="scss">
main {
  padding-top: 20px;
}
</style>
