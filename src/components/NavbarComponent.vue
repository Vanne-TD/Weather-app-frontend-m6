<!-- src/components/NavbarComponent.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores/userStore'
import ThemeSwitcherComponent from '@/components/ThemeSwitcherComponent.vue'

const userStore = useUserStore()

const isLogged = computed(() => userStore.user !== null)
const menuOpen = ref(false)

function cerrarSesion() {
  userStore.logout()
  menuOpen.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

// Detectar click fuera
function handleClickOutside(e) {
  const menu = document.querySelector('.mobile-menu')
  const btn = document.querySelector('.hamburger-btn')

  if (!menuOpen.value) return
  if (menu.contains(e.target)) return
  if (btn.contains(e.target)) return

  closeMenu()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="l-header__nav container-fluid">

    <!-- LOGO -->
    <h2 class="l-header__logo">🌤️ BioClima</h2>

    <!-- DESKTOP LINKS -->
    <div class="l-header__links desktop-only">
      <RouterLink to="/" class="l-header__link">Home</RouterLink>
      <RouterLink to="/about" class="l-header__link">About</RouterLink>

      <template v-if="!isLogged">
        <RouterLink to="/login" class="l-header__link">Login</RouterLink>
        <RouterLink to="/registro" class="l-header__link">Registro</RouterLink>
      </template>

      <template v-else>
        <RouterLink to="/favoritos" class="l-header__link">Favoritos</RouterLink>
        <RouterLink to="/preferencias" class="l-header__link">Preferencias</RouterLink>

        <button class="l-header__link btn-link" @click="cerrarSesion">
          Cerrar sesión
        </button>
      </template>
    </div>

    <!-- THEME SWITCHER (desktop) -->
    <div class="desktop-only">
      <ThemeSwitcherComponent />
    </div>

    <!-- HAMBURGER BUTTON (mobile) -->
    <button class="hamburger-btn mobile-only" type="button" aria-label="Abrir menú" @click="toggleMenu">
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
      <span :class="{ open: menuOpen }"></span>
    </button>

    <!-- OVERLAY GLASS -->
    <div class="overlay-glass" :class="{ open: menuOpen }"></div>

    <!-- MOBILE MENU GLASS -->
    <div class="mobile-menu" :class="{ open: menuOpen }">
      <div class="mobile-menu__content">

        <!-- CATEGORÍAS CON FLECHA -->
        <RouterLink to="/" class="mobile-item" @click="toggleMenu">
          <span>Home</span>
          <span class="arrow">→</span>
        </RouterLink>

        <RouterLink to="/about" class="mobile-item" @click="toggleMenu">
          <span>About</span>
          <span class="arrow">→</span>
        </RouterLink>

        <template v-if="!isLogged">
          <RouterLink to="/login" class="mobile-item" @click="toggleMenu">
            <span>Login</span>
            <span class="arrow">→</span>
          </RouterLink>

          <RouterLink to="/registro" class="mobile-item" @click="toggleMenu">
            <span>Registro</span>
            <span class="arrow">→</span>
          </RouterLink>
        </template>

        <template v-else>
          <RouterLink to="/favoritos" class="mobile-item" @click="toggleMenu">
            <span>Favoritos</span>
            <span class="arrow">→</span>
          </RouterLink>

          <RouterLink to="/preferencias" class="mobile-item" @click="toggleMenu">
            <span>Preferencias</span>
            <span class="arrow">→</span>
          </RouterLink>

          <button class="mobile-item btn-link" @click="cerrarSesion">
            <span>Cerrar sesión</span>
            <span class="arrow">→</span>
          </button>
        </template>

        <!-- Theme Switcher inside menu -->
        <div class="mobile-menu__theme">
          <ThemeSwitcherComponent />
        </div>

      </div>
    </div>

  </nav>
</template>

<style scoped></style>
