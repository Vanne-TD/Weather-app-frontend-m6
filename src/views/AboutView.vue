<script setup>
import iconosClima from '@/assets/img/iconos-clima-nublado-lluvioso-soleado.png'

</script>

<template>
  <main class="container my-5 about">

    <!-- Encabezado -->
    <section class="text-center mb-5">
      <h1 class="about__title display-4 fw-bold">Sobre esta aplicación</h1>
      <p class="about__subtitle lead mt-3">
        Una herramienta creada para entregar información meteorológica clara,
        accesible y útil para cualquier ciudad del mundo.
      </p>
    </section>

    <div class="row align-items-center mb-5">
      <div class="col-12 col-md-4 text-center mb-4 mb-md-0">
        <img
          :src="iconosClima"
          class="about__image img-fluid rounded-circle shadow"
          alt="Iconos del clima"
        />
      </div>

      <div class="col-12 col-md-8">
        <section class="about__section">

          <p class="about__text">
            Esta aplicación fue desarrollada por
            <strong>Vanessa Torres Drake</strong> como parte del
            pre‑portafolio del Bootcamp de Frontend de Talento Digital para
            Chile.
          </p>

          <p class="about__text">
            Su primera versión estuvo enfocada exclusivamente en 12 localidades
            de la Región del Biobío, mostrando clima y pronósticos semanales
            mediante datos mock.
          </p>

          <p class="about__text">
            Hoy, el proyecto ha evolucionado: gracias a la integración con la
            API de OpenWeather, es posible consultar el clima de cualquier
            ciudad del mundo en tiempo real, con temperaturas, íconos,
            pronósticos y estadísticas actualizadas automáticamente.
          </p>

          <p class="about__text">
            ¡Espero que disfrutes esta aplicación y que puedas consultar tu
            clima de forma rápida, sencilla y confiable!
          </p>

        </section>
      </div>
    </div>

    <!-- Secciones adicionales -->
    <section class="mb-5">
      <h2 class="about__subtitle fw-bold mb-3">🎯 Objetivo del Proyecto</h2>
      <p class="about__text">
        Crear una plataforma simple, visual y responsiva que permita consultar
        el clima actual y el pronóstico semanal de cualquier ciudad, manteniendo
        la esencia del proyecto original del Biobío.
      </p>
    </section>

    <section class="mb-5">
      <h2 class="about__subtitle fw-bold mb-3">⚙️ Funcionalidades</h2>
      <ul class="about__list">
        <li>Clima actual por ciudad.</li>
        <li>Pronóstico semanal con íconos representativos.</li>
        <li>Página de detalles con información ampliada.</li>
        <li>Estadísticas semanales (mín, máx, promedio).</li>
        <li>Búsqueda global de ciudades.</li>
        <li>Datos en tiempo real mediante API meteorológica.</li>
        <li>Navegación SPA con Vue Router.</li>
      </ul>
    </section>

    <section class="mb-5">
      <h2 class="about__subtitle fw-bold mb-3">💻 Tecnologías Utilizadas</h2>
      <ul class="about__list">
        <li>Vue 3 + Composition API</li>
        <li>Vue Router</li>
        <li>SCSS con metodología BEM</li>
        <li>Bootstrap 5</li>
        <li>JavaScript ES6+</li>
        <li>Consumo de API OpenWeather (fetch + async/await)</li>
        <li>SPA con componentes reutilizables</li>
      </ul>
    </section>

  </main>
</template>

<style scoped>

/* Puedes dejarlo vacío si usarás tu SASS 7-1 */
</style>
