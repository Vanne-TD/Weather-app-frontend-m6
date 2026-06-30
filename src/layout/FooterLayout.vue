<!-- src/layout/FooterLayout.vue -->
<script setup>
import { useWeatherStore } from '@/stores/weatherStore'
const weatherStore = useWeatherStore()
</script>

<template>
  <footer :class="['l-footer', weatherStore.theme]">
    <div class="container">
      <div class="row gy-4 align-items-center">

        <div class="col-12 col-md-4 text-center text-md-start">
          <span class="l-footer__logo">🌤️ BioClima 🌤️</span>
          <p class="l-footer__author text-white">Vanessa Torres Drake</p>
          <p class="l-footer__description mt-2">
            Proyecto original del Biobío, ahora ampliado para consultar el clima de cualquier ciudad del mundo.
          </p>
        </div>

        <div class="col-12 col-md-4 text-center">
          <nav class="l-footer__nav">
            <ul class="list-unstyled d-flex justify-content-center gap-3 mb-0">
              <li><router-link to="/" class="l-footer__link">Inicio</router-link></li>
              <li><router-link to="/about" class="l-footer__link">Proyecto</router-link></li>
              <li><router-link to="/contacto" class="l-footer__link">Contacto</router-link></li>
            </ul>
          </nav>
        </div>

        <div class="col-12 col-md-4 text-center text-md-end">
          <p class="l-footer__copyright mb-0">
            &copy; 2026 🌤️ BioClima. Vanessa Torres Drake<br>
            <small>Diseñado en Vue 3.</small>
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss"></style>
