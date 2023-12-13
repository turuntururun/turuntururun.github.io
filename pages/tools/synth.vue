<script lang="ts">
import {defineComponent} from 'vue'

const toneDepth = {c1: 'TONE', c2: 'DEPTH'};
const tonePitch = {c1: 'TONE', c2: 'PITCH'};
const depthPitch = {c1: 'DEPTH', c2: 'PITCH'};
const rateDepth = {c1: 'RATE (TEMPO)',c2: 'DEPTH'};
const types = [
  {name: 'LEAD1', variations: [
      {name: "SAW LEAD", controls: toneDepth},
      {name: "SAW LEAD OCT UP", controls: toneDepth},
      {name: "SQUARE LEAD", controls: toneDepth},
      {name: "SQUARE LEAD OCT UP", controls: toneDepth},
      {name: "SYNC LEAD 1", controls: toneDepth},
      {name: "SYNC LEAD 2", controls: toneDepth},
      {name: "SINE LEAD", controls: toneDepth},
      {name: "BRASSY LEAD", controls: toneDepth},
      {name: "TRI LEAD", controls: toneDepth},
      {name: "WHISTLY LEAD", controls: toneDepth},
      {name: "SAW LEAD (PITCH CONTROL)", controls: tonePitch},
    ]},
  {name: 'LEAD2', variations:[
      {name: "5th LEAD 1", controls: toneDepth},
      {name: "5th LEAD 2", controls: toneDepth},
      {name: "5th LEAD 3", controls: toneDepth},
      {name: "5th LEAD 4", controls: toneDepth},
      {name: "OCT LEAD 1", controls: toneDepth},
      {name: "OCT LEAD 2", controls: toneDepth},
      {name: "UPPER OCT LEAD", controls: toneDepth},
      {name: "PWM LEAD", controls: toneDepth},
      {name: "PWM OCT LEAD", controls: toneDepth},
      {name: "FILTER LEAD", controls: toneDepth},
      {name: "SQUARE LEAD (PITCH CONTROL)", controls: tonePitch},
    ] },
  {name: 'PAD', variations:[
      {name: "SAW PAD", controls: toneDepth},
      {name: "SOFT PAD", controls: toneDepth},
      {name: "LAYERED PAD 1 (Octave Down on Lower Notes Only)", controls: toneDepth},
      {name: "ORCHESTRAL PAD", controls: toneDepth},
      {name: "HEAVY PAD", controls: toneDepth},
      {name: "LAYERED PAD 2 (Octave Down on Lower Notes Only)", controls: toneDepth},
      {name: "SYNTH BRASS 1", controls: toneDepth},
      {name: "LAYERED SYNTH BRASS 2 (Octave Down on Lower Notes Only)", controls: toneDepth},
      {name: "SYNTH BRASS 2", controls: toneDepth},
      {name: "PHASED PAD", controls: toneDepth},
      {name: "SAW PAD (PITCH CONTROL)", controls: tonePitch},
    ] },
  {name: 'BASS', variations:[
      {name: "FILTER BASS 1", controls: toneDepth},
      {name: "FILTER BASS 2", controls: toneDepth},
      {name: "FILTER BASS 3", controls: toneDepth},
      {name: "DARK BASS 1", controls: toneDepth},
      {name: "DARK BASS 2", controls: toneDepth},
      {name: "SAW BASS", controls: toneDepth},
      {name: "DIRTY SQUARE BASS", controls: toneDepth},
      {name: "BOWED BASS", controls: toneDepth},
      {name: "FILTER BASS 4", controls: toneDepth},
      {name: "LIGHT SQUARE BASS", controls: toneDepth},
      {name: "SAW BASS (PITCH CONTROL)", controls: tonePitch},
    ] },
  {name: 'STR', variations:[
      {name: "DETUNED STRINGS", controls: toneDepth},
      {name: "HIGH OCTAVE STRINGS", controls: toneDepth},
      {name: "LOW OCTAVE STRINGS", controls: toneDepth},
      {name: "LOW+HIGH STRINGS", controls: toneDepth},
      {name: "LIGHT STRINGS", controls: toneDepth},
      {name: "LAYERED STRINGS 1 (Octave Down on Lower Notes Only)", controls: toneDepth},
      {name: "LAYERED STRINGS 2 (Octave Down on Lower Notes Only)", controls: toneDepth},
      {name: "LAYERED STRINGS 3 (Octave Down on Lower Notes Only)", controls: toneDepth},
      {name: "SWEEP STRINGS", controls: toneDepth},
      {name: "PHASED STRINGS", controls: toneDepth},
      {name: "DETUNED STRINGS (PITCH CONTROL)", controls: tonePitch},
    ] },
  {name: 'ORGAN', variations: [
      {name: "ROTARY SLOW 1", controls: toneDepth},
      {name: "ROTARY SLOW 2", controls: toneDepth},
      {name: "ROTARY SLOW 3", controls: toneDepth},
      {name: "ROTARY FAST 1", controls: toneDepth},
      {name: "ROTARY FAST 2", controls: toneDepth},
      {name: "COMP ORGAN 1", controls: toneDepth},
      {name: "COMP ORGAN 2", controls: toneDepth},
      {name: "LAYERED ORGAN (Octave Down on Lower Notes Only)", controls: toneDepth},
      {name: "CHORUS ORGAN", controls: toneDepth},
      {name: "SWEEP ORGAN", controls: toneDepth},
      {name: "ROTARY FAST (PITCH CONTROL)", controls: tonePitch},
    ]},
  {name: 'BELL', variations: [
      {name: "BELL 1", controls: toneDepth},
      {name: "BELL 2", controls: toneDepth},
      {name: "BELL SQUARE", controls: toneDepth},
      {name: "BELL 3", controls: toneDepth},
      {name: "BELL SAW", controls: toneDepth},
      {name: "BELL BASS", controls: toneDepth},
      {name: "BELL STRINGS", controls: toneDepth},
      {name: "STEEL PAN 1", controls: toneDepth},
      {name: "STEEL PAN 2", controls: toneDepth},
      {name: "PHASED BELL", controls: toneDepth},
      {name: "BELL (PITCH CONTROL)", controls: tonePitch},
    ]},
  {name: 'SFX1', variations: [
      {name: "WIND", controls: toneDepth},
      {name: "LASER BEAM", controls: toneDepth},
      {name: "LO-FI", controls: toneDepth},
      {name: "BEEP", controls: toneDepth},
      {name: "LO-FI PHASE", controls: toneDepth},
      {name: "GOING DOWN 1", controls: depthPitch},
      {name: "GOING UP 1", controls: depthPitch},
      {name: "WIGGLE", controls: depthPitch},
      {name: "GOING DOWN 2", controls: depthPitch},
      {name: "GOING UP 2", controls: depthPitch},
      {name: "BUBBLE", controls: toneDepth},
    ]},
  {name: 'SFX2', variations: [
      {name: "MOVING FILTER 1", controls: {c1: 'RATE',c2: 'DEPTH'}},
      {name: "MOVING FILTER 2 RATE DEPTH", controls: {c1: 'RATE',c2: 'DEPTH'}},
      {name: "MOVING PITCH", controls: {c1: 'RATE',c2: 'DEPTH'}},
      {name: "BREATH 1", controls: toneDepth},
      {name: "BREATH 2", controls: toneDepth},
      {name: "TOUCH FILTER 1", controls: toneDepth},
      {name: "TOUCH FILTER 2", controls: toneDepth},
      {name: "TOUCH FILTER 3", controls: toneDepth},
      {name: "SENSITIVE PITCH", controls: toneDepth},
      {name: "RING MOD 1", controls: toneDepth},
      {name: "RING MOD 2", controls: toneDepth},
    ]},
  {name: 'SEQ1', variations: [
      {name: "SIMPLE BASS 16th NOTE", controls: rateDepth},
      {name: "SIMPLE BASS 8th NOTE", controls: rateDepth},
      {name: "MOVING ORGAN", controls: rateDepth},
      {name: "MOVING FILTER 3", controls: rateDepth},
      {name: "SEQUENCE 1", controls: rateDepth},
      {name: "SEQUENCE 2", controls: rateDepth},
      {name: "NOISY SEQUENCE", controls: rateDepth},
      {name: "SEQUENCE 3", controls: rateDepth},
      {name: "RHYTHM + BASS 8th NOTE", controls: rateDepth},
      {name: "RHYTHM + BASS TRIPLET", controls: rateDepth},
      {name: "RHYTHM + BASS 16th NOTE", controls: rateDepth},
    ]},
  {name: 'SEQ2', variations: [
      {name: "ARPEGGIO 1", controls: rateDepth},
      {name: "ARPEGGIO 2", controls: rateDepth},
      {name: "ARPEGGIO 3", controls: rateDepth},
      {name: "ARPEGGIO 4", controls: rateDepth},
      {name: "BASS SEQUENCE 1", controls: rateDepth},
      {name: "BASS SEQUENCE 2", controls: rateDepth},
      {name: "BASS SEQUENCE + STRINGS", controls: rateDepth},
      {name: "BASS SEQUENCE + BRASS", controls: rateDepth},
      {name: "BASS SEQUENCE + RHYTHM 1", controls: rateDepth},
      {name: "BASS SEQUENCE + RHYTHM 2", controls: rateDepth},
      {name: "BASS SEQUENCE + RHYTHM 3", controls: rateDepth},
    ]
  },
]

export default defineComponent({
  name: "synth",
  data: () => ({
    type: 0,
    variation: 0,
  }),
  computed: {
    selectedType() {
      return types[this.type]
    },
    selectedVariation() {
      return this.selectedType.variations[this.variation]
    },
  },
  methods: {}
})
</script>

<template>
  <section>
<!--    <NuxtLink to="/"> 🏠</NuxtLink>-->


    <pre>Effect: {{ selectedType.name }} - {{ selectedVariation.name}}</pre>
    <pre>Control 1: {{ selectedVariation.controls.c1 }}</pre>
    <pre>Control 2: {{ selectedVariation.controls.c2 }}</pre>

    <label>
      Type {{ selectedType.name }}
      <input type="range" v-model="type" min="0" max="10"/>
    </label>

    <p><label>
      Variation {{ Number.parseInt(variation) + 1 }}
      <input type="range" v-model="variation" min="0" max="10"/>
    </label>
    </p>

  </section>
</template>

<style scoped>
label {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
}

section {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 2rem auto;
  font-size: 1.3rem;
}
</style>
