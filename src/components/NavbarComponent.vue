<template>
  <nav class="l-header__nav container">
    <h2 class="l-header__logo">🌤️ BioClima</h2>
    <div class="l-header__links">
      <RouterLink to="/" class="l-header__link">Home</RouterLink>
      <RouterLink to="/about" class="l-header__link">About</RouterLink>
      
      <p v-if="isAuthenticated">Hola, {{ user.name }}</p>
      <button v-if="isAuthenticated" @click="logout">Cerrar sesión</button>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped lang="scss"></style>
