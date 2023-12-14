<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Fretboard",
  data() {
    return {
      yPadding: 10,
      xPadding: 10,
      criterion: Math.ceil
    }
  },
  props: ['fingerings'],
  computed: {
    // TODO show custom strings/frets dynamically
    strings() {
      return [1, 2, 3, 4, 5, 6]
    },
    frets() {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
  },
  methods: {
    toFretPosition(string: number, note: number) {
      const x = Math.max(2.5 + note * 15, 5);
      const y = 10 + string * 5;
      return `translate(${x},${y})`
    },
  }
})
</script>

<template>
  <svg viewBox="0 0 200 45">
    <g>
      <line class="guitar-strings" v-for="s in strings"
            x1="10" :y1="10 + s*5" x2="200" :y2="10 + s*5"
            stroke="black" stroke-width="1"/>
      <line class="guitar-frets" v-for="s in frets"
            y1="15" :x1="10+ s*15" y2="40" :x2="10+ s*15"
            stroke="black" stroke-width="1"/>
      <circle v-for="c in [3,5,7,9,12,15]" r="1" :cx="2.5+ c*15" cy="27.5" fill="gray"/>
    </g>

    <g v-for="(f, i) in fingerings" :transform="toFretPosition(f[0],f[1])" :key="i">
      <circle r="2.5" cx="0" cy="0" fill="white" stroke="black" stroke-width="0.5"/>
      <text x="-1.5" y="1.6" font-size="5" font-weight="bold" font-family="monospace">{{ f[2] }}</text>
    </g>
  </svg>

</template>

<style scoped>

</style>
