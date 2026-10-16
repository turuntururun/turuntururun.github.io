<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <span class="spoiler" :class="{ revealed: isOpen }" @click="isOpen = !isOpen">
    <slot></slot>
  </span>
</template>

<style scoped>
.spoiler {
  background-color: #2a2a2a;
  color: transparent;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  padding: 0 4px;
  transition: all 0.2s ease;
  margin-bottom: 1px black solid;
}

.spoiler.revealed {
  background-color: transparent;
  color: inherit;
  user-select: text;
}
</style>
