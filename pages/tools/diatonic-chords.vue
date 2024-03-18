<script lang="ts">
import { defineComponent } from 'vue'
import { harmonicMinor, major, melodicMinor, noteName, octaves, parseChord, scaleComposer } from 'assets/scales'
import { range } from '@antfu/utils'

type scales = 'Major' | 'Natural minor' | 'Harmonic minor'
const scaleBuilders: { [a in scales]: (n: number) => number[] } = {
  Major: major,
  'Natural minor': melodicMinor,
  'Harmonic minor': harmonicMinor
}

export default defineComponent({
  name: 'diatonic-chords-calculator',
  data(): { root: number, scale: scales } {
    return {
      root: 0,
      scale: 'Major'
    }
  },
  computed: {
    scales(): scales[] {
      return [
        'Major',
        'Natural minor',
        'Harmonic minor'
      ]
    },
    notes(): number[] {
      // todo sort with C in the middle
      return range(0, 12)
        .map(n => (n * 7) % 12)
    },
    things() {
      let base = scaleBuilders[this.scale]
      return scaleComposer(base, octaves(2))(this.root)
    },
    preferredAccident(): string {
      const diff = this.notes.indexOf(this.root)
      if (diff > this.notes.length - diff) {
        return 'b'
      }
      return '#'
    }
  },
  methods: {
    range,
    parseChord(notes: number[]): string {
      const strings = parseChord(notes)
      if (strings.length == 1) {
        return strings[0]
      }
      return strings.find(a => a.includes(this.preferredAccident))!
    },
    noteName(n: number): string {
      let strings = noteName(n)
      if (strings.length == 1) {
        return strings[0]
      }
      const diff = this.notes.indexOf(n)
      if (diff > this.notes.length - diff) {
        return strings[1]
      }
      return strings[0]
    }
  }
})
</script>

<template>
  <section>
    <p>
      <label>
        Root
        <select v-model="root">
          <option v-for="n in notes" :value="n">{{ noteName(n) }}</option>
        </select>
      </label>
      <label>
        Scale
        <select v-model="scale">
          <option v-for="s in scales">{{ s }}</option>
        </select>
      </label>
    </p>
  </section>
  <section class="data">
    <span v-for="a in range(0,7)">
      {{ a + 1 }}. {{ parseChord([things[a], things[a + 2], things[a + 4]]) }}
    </span>
  </section>
</template>

<style scoped lang="scss">
label {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  margin: 0 2rem;
}

p {
  display: flex;
  flex-flow: row;
}

section {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 2rem auto;
  font-size: 1.3rem;
}

.data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;

  span {
    text-align: center;
    padding: 1rem;
  }

}
</style>
