<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'dashboard',
  props:{
    innerKnob: 'string',
    outerKnob: 'string',
  }
})
</script>

<template>
  <svg style="margin: 2rem 1rem">
    <circle r="50" cx="50" cy="50" />
    <circle r="38" cx="50" cy="50" fill="white" />
    <circle r="28" cx="50" cy="50" />

    <text x="50" y="50" text-anchor="middle" style="fill: aqua"> {{ innerKnob }}</text>
    <text x="95" y="20" style="fill: darkslateblue"> {{ outerKnob }}</text>
  </svg>
</template>

<style scoped>

</style>
