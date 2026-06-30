<!-- src/views/RegistroView.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Esto es solo visual, no guarda en Vuex.
// El módulo 7 permite registro simulado.
const email = ref('')
const password = ref('')
const name = ref('')
const msg = ref('')

function registrar() {
  if (!email.value || !password.value || !name.value) {
    msg.value = 'Completa todos los campos'
    return
  }

  msg.value = 'Cuenta creada (simulada). Ahora inicia sesión.'
  setTimeout(() => router.push('/login'), 1500)
}
</script>

<template>
  <main class="container py-4">
    <h1 class="text-center mb-4">Crear cuenta</h1>

    <form @submit.prevent="registrar" class="mx-auto" style="max-width: 400px;">
      <input v-model="name" type="text" class="form-control mb-3" placeholder="Nombre" />
      <input v-model="email" type="email" class="form-control mb-3" placeholder="Correo" />
      <input v-model="password" type="password" class="form-control mb-3" placeholder="Contraseña" />

      <button class="btn btn-success w-100">Registrar</button>

      <p v-if="msg" class="mt-3 text-center">{{ msg }}</p>
    </form>
  </main>
</template>

<style scoped>
</style>
