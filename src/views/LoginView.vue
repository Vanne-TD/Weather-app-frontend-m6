<!--  src/views/LoginView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

// ⭐ Pinia store
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const router = useRouter()

async function login() {
  // Credenciales demo para revisión funcional
  if (
    (['vanne@bioclima.cl', 'vanne'].includes(email.value.trim().toLowerCase()) && password.value === '1234') ||
    (['admin@bioclima.cl', 'admin'].includes(email.value.trim().toLowerCase()) && password.value === 'admin')
  ) {
    userStore.login({
      email: email.value,
      favorites: [],
      preferences: { units: 'metric' }
    })

    router.push('/')
  } else {
    errorMsg.value = 'Usuario o contraseña incorrectos. Usa vanne@bioclima.cl / 1234 o admin@bioclima.cl / admin'
  }
}
</script>

<template>
  <main class="container py-4 login-view">
    <h1 class="text-center mb-4">Iniciar sesión</h1>

    <div class="login-card mx-auto">
      <form @submit.prevent="login">
        <input v-model="email" type="text" placeholder="Correo o usuario" />
        <input v-model="password" type="password" placeholder="Contraseña" />

        <button class="login-btn">Ingresar</button>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>
