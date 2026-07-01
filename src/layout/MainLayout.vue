<script setup>
import HeaderLayout from './HeaderLayout.vue'
import FooterLayout from './FooterLayout.vue'
</script>

<template>
  <div class="main-layout d-flex flex-column min-vh-100">
    <HeaderLayout />

    <main class="main-layout__content flex-grow-1">
      <slot />
    </main>

    <FooterLayout />
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/abstracts/variables" as *;

.main-layout__content {
  padding-top: $space-md;
}
</style>
