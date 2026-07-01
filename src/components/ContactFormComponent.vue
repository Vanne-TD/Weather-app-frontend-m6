<!-- src/components/ContactFormComponent.vue -->
<script setup>
import { ref, computed } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const status = ref('')

const maxWords = 50

const wordCount = computed(() => {
  if (!message.value) return 0
  return message.value.trim().split(/\s+/).length
})

function enviarFormulario() {
  if (!name.value || !email.value || !message.value) {
    status.value = 'Por favor completa todos los campos.'
    return
  }

  if (wordCount.value > maxWords) {
    status.value = `Máximo permitido: ${maxWords} palabras.`
    return
  }

  status.value = 'Mensaje enviado correctamente. ¡Gracias por contactarnos!'

  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <form @submit.prevent="enviarFormulario" class="mx-auto" style="max-width: 500px;">
    <input v-model="name" type="text" class="form-control mb-3" placeholder="Tu nombre" />

    <input v-model="email" type="email" class="form-control mb-3" placeholder="Tu correo" />

    <textarea v-model="message" class="form-control mb-1" rows="4" placeholder="Tu mensaje"></textarea>

    <p class="text-end small">
      {{ wordCount }} / {{ maxWords }} palabras
    </p>

    <button class="btn btn-primary w-100">Enviar mensaje</button>

    <p v-if="status" class="mt-3 text-center">{{ status }}</p>
  </form>
</template>

<style scoped>

form {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  color: var(--main-text);
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.2);
  color: var(--main-text);
  backdrop-filter: blur(6px);
  margin-bottom: 16px;
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: var(--main-text);
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.35);
  }
}
</style>


