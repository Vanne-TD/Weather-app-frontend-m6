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
.register-view h1 {
  color: var(--main-text);
}

.register-card {
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

.register-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.25);
  border: none;
  color: var(--main-text);
  cursor: pointer;
}

.msg {
  margin-top: 12px;
  color: var(--main-text);
  text-align: center;
}
</style>

