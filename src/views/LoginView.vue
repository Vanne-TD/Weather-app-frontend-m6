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
  // ⭐ Simulación de login (igual que antes)
  if (
    (email.value === 'vanne' && password.value === '1234') ||
    (email.value === 'admin' && password.value === 'admin')
  ) {
    userStore.login({
      email: email.value,
      favorites: [],
      preferences: { units: 'metric' }
    })

    router.push('/')
  } else {
    errorMsg.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<template>
  <main class="container py-4 login-view">
    <h1 class="text-center mb-4">Iniciar sesión</h1>

    <div class="login-card mx-auto">
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Correo" />
        <input v-model="password" type="password" placeholder="Contraseña" />

        <button class="login-btn">Ingresar</button>

        <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
.login-view h1 {
  color: var(--main-text);
}

.login-card {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  color: var(--main-text);
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.2);
  color: var(--main-text);
}

.login-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  color: var(--main-text);
  cursor: pointer;
}

.error-msg {
  margin-top: 12px;
  color: #ffdddd;
  text-align: center;
}
</style>
