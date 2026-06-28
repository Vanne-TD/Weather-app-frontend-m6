<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref('')

function enviarFormulario() {
  if (!name.value || !email.value || !message.value) {
    status.value = 'Por favor completa todos los campos.'
    return
  }

  status.value = 'Mensaje enviado correctamente. ¡Gracias por contactarnos!'

  // Limpiar formulario
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <form @submit.prevent="enviarFormulario" class="mx-auto" style="max-width: 500px;">
    <input
      v-model="name"
      type="text"
      class="form-control mb-3"
      placeholder="Tu nombre"
    />

    <input
      v-model="email"
      type="email"
      class="form-control mb-3"
      placeholder="Tu correo"
    />

    <textarea
      v-model="message"
      class="form-control mb-3"
      rows="4"
      placeholder="Tu mensaje"
    ></textarea>

    <button class="btn btn-primary w-100">Enviar mensaje</button>

    <p v-if="status" class="mt-3 text-center">{{ status }}</p>
  </form>
</template>

<style scoped>
form {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}
</style>
