<script setup>
defineProps({
  label: String,
  type: { type: String, default: "button" }
})

defineEmits(["click"])
</script>

<template>
  <button class="btn-primary" :type="type" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped lang="scss">
/* vacío — el estilo va en SASS 7–1 */
</style>
