<script lang="ts">
import {defineComponent} from 'vue'
import Fretboard from "~/components/Fretboard.vue";

/*
1. Note location
  a. By string
  b. By fret
  c. By note
2. Scales
All in C (x7), then in all(x12x7), prioritize C, F, Bb, Eb, G, D, A. First two octave scale, then 3 octave scale.
  a. Major
  b. Melodic minor
  c. Harmonic minor
  d. Harmonic major
 */

// low E is midi 40.

const noteDict = new Map([
  [0, "C"],
  [1, "C#"],
  [2, "D"],
  [3, "D#"],
  [4, "E"],
  [5, "F"],
  [6, "F#"],
  [7, "G"],
  [8, "G#"],
  [9, "A"],
  [10, "A#"],
  [11, "B"],
])

const scales: { [key: string]: number[] } = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 4, 5, 7, 9, 11],
  harmonicMinor: [0, 2, 4, 5, 7, 9, 11],
  harmonicMajor: [0, 2, 4, 5, 7, 9, 11],
}

export default defineComponent({
  name: "guitar-proficiency",
  components: {Fretboard},
  data: () => ({
    scale: 'major',
    baseNote: 48,
    octaves: 2,
  }),
  methods: {
    // have these functions in a package and create tests for them
    noteName(n: number): string {
      // todo name b or # according to context
      return noteDict.get(n % 12) ?? ''
    },
    getFret(note: number, string: number) {
      // todo consider alternate tunings
      const baseNote = {
        1: 64,
        2: 59,
        3: 55,
        4: 50,
        5: 45,
        6: 40,
      }[string]
      if (!baseNote) {
        return 3000
      }
      return note - baseNote
    }

  },
  computed: {
    notes() {
      // todo generate according to pattern
      return [
        [6, 5, "A"],
        [6, 7, "B"],
        [6, 8, "C"],
        [5, 5, "D"],
        [5, 7, "E"],
        [5, 8, "F"],
        [4, 5, "G"],
        [4, 7, "A"],
        [3, 4, "B"],
        [3, 5, "C"],
        [3, 7, "D"],
        [2, 5, "E"],
        [2, 6, "F"],
        [2, 8, "G"],
        [1, 5, "A"],
      ]
    }
  }

})
</script>

<template>

  <Fretboard :fingerings="notes"/>
  <p>TODO render music notation</p>
  <p>TODO show exercise data</p>
  <p>Given that low E is 40, E mod is {{ 40 % 12 }} and the next C is {{ 40 + (12 - (40 % 12)) }}</p>

  <p>{{ notes }}</p>


</template>

<style scoped>

</style>
