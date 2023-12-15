<script lang="ts">
import {defineComponent} from 'vue'
import Fretboard from "~/components/Fretboard.vue";
import {
  closed,
  generateFingering,
  harmonicMajor,
  harmonicMinor,
  major,
  melodicMinor,
  octaves,
  onDegree,
  scaleComposer
} from "assets/scales";

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

export default defineComponent({
  name: "guitar-proficiency",
  components: {Fretboard},
  data: () => ({
    scale: 'major',
    baseNote: 48,
    mode: 1,
  }),
  methods: {},
  computed: {
    notes() {
      // todo generate note naming
      return generateFingering(scaleComposer(this.scaleProvider, onDegree(this.mode), octaves(2), closed)(this.baseNote))
    },
    scaleProvider() {
      return {
        major: major,
        melodicMinor: melodicMinor,
        harmonicMinor: harmonicMinor,
        harmonicMajor: harmonicMajor,
      }[this.scale]!
    }
  }

})
</script>

<template>

  <select v-model="scale">
    <option>major</option>
    <option>melodicMinor</option>
    <option>harmonicMinor</option>
    <option>harmonicMajor</option>
  </select>
  <!-- todo use closed select for these guys -->
  <input type="number" v-model="baseNote">
  <input type="number" v-model="mode">
  <Fretboard :fingerings="notes"/>
  <p>TODO render music notation</p>
  <p>TODO show exercise data</p>
  <p>Given that low E is 40, E mod is {{ 40 % 12 }} and the next C is {{ 40 + (12 - (40 % 12)) }}</p>

  <p>{{ notes }}</p>


</template>

<style scoped>

</style>
