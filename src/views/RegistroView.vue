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
  <main class="container py-4 register-view">
    <h1 class="text-center mb-4">Crear cuenta</h1>

    <div class="register-card mx-auto">
      <form @submit.prevent="registrar">
        <input v-model="name" type="text" placeholder="Nombre" />
        <input v-model="email" type="email" placeholder="Correo" />
        <input v-model="password" type="password" placeholder="Contraseña" />

        <button class="register-btn">Registrar</button>

        <p v-if="msg" class="msg">{{ msg }}</p>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">

</style>

