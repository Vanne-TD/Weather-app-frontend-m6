<!-- src/views/ContactView.vue -->
<script setup>
import ContactFormComponent from '../components/ContactFormComponent.vue'
</script>

<template>
  <main class="container py-4 contact-view">
    <h1 class="text-center mb-4">Contacto</h1>

    <div class="contact-card">
      <ContactFormComponent />
    </div>
  </main>
</template>

<style scoped lang="scss">
.contact-view h1 {
  color: var(--main-text);
}

.contact-card {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 12px;
  color: var(--main-text);
  max-width: 600px;
  margin: 0 auto;
}
</style>
