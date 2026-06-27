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

</style>
