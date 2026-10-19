<script setup lang="ts">
import {
  persons,
  modes,
  sampleConjugations,
  weirdPresents,
  weirdFutures,
  weirdParticiples,
} from '~/assets/data/italian-words.ts'

const themes = [
  'Coniugazioni',
  'Verbi con presente irregolare',
  'Verbi con participio passato irregolare',
  'Verbi con futuro irregolare',
]

// todo cache values in user's storage
const theme: Ref<number> = ref(0)
const selectedVerb: Ref<string> = ref('')
const conj: Ref<{ v: string; t: string; m: string }> = ref({
  v: 'essere',
  t: 'presente',
  m: 'indicativo',
})
</script>

<template>
  <form>
    <FieldSelect
      title="Tema"
      v-model="theme"
      :options="themes"
      orientation="row"
    />
  </form>
  <section v-if="theme === 0">
    <section class="options">
      <FieldSelect
        title="Verbo"
        v-model="conj.v"
        :options="Object.keys(sampleConjugations)"
      />
      <FieldSelect
        title="Modo"
        v-model="conj.m"
        :options="Object.keys(modes)"
      />
      <FieldSelect
        v-if="!['infinito', 'gerundio', 'participio'].includes(conj.m)"
        title="Tempo"
        v-model="conj.t"
        :options="modes[conj.m] || []"
      />
    </section>

    <table v-if="sampleConjugations[conj.v][conj.m][conj.t]">
      <thead>
        <tr>
          <th></th>
          <th>{{ conj.v }}</th>
        </tr>
      </thead>
      <tbody v-if="['infinito', 'gerundio', 'participio'].includes(conj.m)">
        <tr>
          <td>presente</td>
          <td>{{ sampleConjugations[conj.v][conj.m].presente ?? '---' }}</td>
        </tr>
        <tr>
          <td>passato</td>
          <td>{{ sampleConjugations[conj.v][conj.m].passato ?? '---' }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="p in persons">
          <td>{{ p }}</td>
          <td>{{ sampleConjugations[conj.v][conj.m][conj.t]?.[p] ?? '---' }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-if="theme === 1">
    <div class="side-by-side">
      <FieldSelect
        title="Verbo"
        v-model="selectedVerb"
        :options="Object.keys(weirdPresents)"
        orientation="row"
      />
    <table v-if="weirdPresents[selectedVerb]">
      <thead>
        <tr>
          <th></th>
          <th>{{ selectedVerb }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in persons">
          <td>{{ p }}</td>
          <td>{{ weirdPresents[selectedVerb]?.[p] ?? '' }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </section>
  <section v-if="theme === 2">
    <table>
      <thead>
        <tr>
          <th>Verbo</th>
          <th>Participio passato</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in weirdParticiples">
          <td>{{ p[0] }}</td>
          <td>{{ p[1] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-if="theme === 3">
    <table>
      <tbody>
        <tr v-for="f in weirdFutures">
          <td>{{ f[0] }}</td>
          <td>{{ f[1] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
section {
  margin: 1rem;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 0.5rem;
}

.side-by-side {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
}
</style>
