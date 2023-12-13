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
// low E is midi 40.
  props: ['notes'],
  computed: {
    strings() {
      return [1, 2, 3, 4, 5, 6]
    },
    frets() {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    notesByString() {
      const chunkSize = this.criterion(this.notes.length / (this.strings.length));
      const result = {
        6: this.notes.slice(0, chunkSize)
      }
      // todo algorithm to finger positions

      console.log('chunkSize', chunkSize)
      console.log('result', result)
      console.log('this.notes', this.notes)

      return result
    }
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

    <g>

    </g>
  </svg>
  <pre>{{ notes }}</pre>
  <pre>{{ notesByString }}</pre>
  <pre>{{ notes.length / (strings.length) }}</pre>

</template>

<style scoped>

</style>
