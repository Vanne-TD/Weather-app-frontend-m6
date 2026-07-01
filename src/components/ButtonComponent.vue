<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
})

defineEmits(['click'])
</script>

<template>
  <button class="app-button" :type="type" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped lang="scss">
@use "../assets/styles/abstracts/variables" as *;
@use "../assets/styles/abstracts/mixins" as *;
@use "sass:color";

.app-button {
  @include action-button-base(0.4rem 0.85rem, 2.1rem, 0.9rem, 0.5rem);

  background: $color-accent;
  color: $color-white;
  border: none;

  &:hover {
    background: color.adjust($color-accent, $lightness: -8%);
    transform: translateY(-1px);
  }
}
</style>
