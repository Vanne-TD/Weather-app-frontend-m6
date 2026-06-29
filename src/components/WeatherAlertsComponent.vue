<script setup>
const props = defineProps({
  alerts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section v-if="alerts.length" class="alerts-box">
    <h2 class="text-center mb-3">Alertas del clima</h2>

    <ul class="alerts-list">
      <li v-for="(alert, index) in alerts" :key="index">
        {{ alert }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.alerts-box {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fffae6;
  border-left: 6px solid #ffcc00;
  border-radius: 10px;
}

.alerts-list {
  list-style: none;
  padding: 0;
  line-height: 1.8;
  font-size: 1.1rem;
}
</style>
