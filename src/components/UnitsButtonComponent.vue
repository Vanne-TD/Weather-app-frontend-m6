<script setup>
defineProps({
  label: { type: String, default: "Cambiar unidades" },
  type: { type: String, default: "button" }
})

defineEmits(["click"])
</script>

<template>
  <button class="units-btn" :type="type" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped lang="scss">

</style>
