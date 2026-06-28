<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const store = useStore()
const router = useRouter()

async function login() {
  const success = await store.dispatch('login', {
    email: email.value,
    password: password.value
  })

  if (success) {
    router.push('/')
  } else {
    errorMsg.value = 'Usuario o contraseña incorrectos'
  }
}
</script>

<template>
  <main class="container py-4">
    <h1 class="text-center mb-4">Iniciar sesión</h1>

    <form @submit.prevent="login" class="mx-auto" style="max-width: 400px;">
      <input v-model="email" type="email" class="form-control mb-3" placeholder="Correo" />
      <input v-model="password" type="password" class="form-control mb-3" placeholder="Contraseña" />

      <button class="btn btn-primary w-100">Ingresar</button>

      <p v-if="errorMsg" class="text-danger mt-3 text-center">{{ errorMsg }}</p>
    </form>
  </main>
</template>
