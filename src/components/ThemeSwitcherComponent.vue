<!-- src/components/ThemeSwitcherComponent.vue -->
<script setup>
import { useWeatherStore } from "@/stores/weatherStore"

const weatherStore = useWeatherStore()

function toggleTheme() {
  weatherStore.toggleTheme()
}
</script>

<template>
  <section class="theme-card">
    <h2 class="theme-card__title">Tema</h2>

    <div class="theme-card__options">
      <div
        class="theme-card__option"
        :class="{ active: weatherStore.theme === 'light' }"
      >
        ☀️ Claro
      </div>

      <div
        class="theme-card__option"
        :class="{ active: weatherStore.theme === 'dark' }"
      >
        🌙 Oscuro
      </div>
    </div>

    <button class="theme-card__button" @click="toggleTheme">
      Alternar tema
    </button>
  </section>
</template>

<style scoped lang="scss">
// @use "@/assets/styles/abstracts/variables" as *;
// @use "@/assets/styles/abstracts/mixins" as *;
// @use "@/assets/styles/themes/_theme-variables" as *;

// .theme-card {
//   @include card-surface($color-panel-soft, $radius-base, $shadow-light);
//   @include section-spacing($space-md, $space-md);
//   text-align: center;

//   .light & {
//     background-color: $light-card;
//     color: $light-text;
//   }

//   .dark & {
//     background-color: $dark-card;
//     color: $dark-text;
//   }
// }

// .theme-card__title {
//   font-family: $font-family-heading;
//   font-weight: $font-weight-bold;
//   margin-bottom: $space-sm;
// }

// .theme-card__options {
//   display: flex;
//   justify-content: space-around;
//   margin-bottom: $space-md;
// }

// .theme-card__option {
//   padding: $space-sm $space-md;
//   border-radius: $radius-sm;
//   cursor: pointer;
//   opacity: 0.6;
//   transition: 0.2s;

//   &.active {
//     opacity: 1;
//     background-color: $color-accent;
//     color: white;
//   }
// }

// .theme-card__button {
//   width: 100%;
//   padding: $space-sm;
//   border-radius: $radius-sm;
//   background-color: $color-accent;
//   color: white;
//   font-weight: $font-weight-bold;
//   border: none;
//   cursor: pointer;
//   transition: 0.2s;

//   &:hover {
//     background-color: darken($color-accent, 10%);
//   }
// }
</style>
