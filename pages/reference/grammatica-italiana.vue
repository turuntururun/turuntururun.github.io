<script setup lang="ts">
import {
  persons,
  modes,
  auxiliars,
  weirdPresents,
  weirdFutures,
  weirdParticiples,
} from '~/assets/data/italian-words.ts'

const themes = [
  'Verbi con presente irregolare',
  'Verbi con participio passato irregolare',
  'Verbi con futuro irregolare',
  'Essere/Avere',
]

const theme: Ref<number> = ref(0) //'selected-theme', Number.parseInt)
const selectedVerb: Ref<string> = ref('') // 'selected-verb')
const conj: Ref<{ v: 'essere' | 'avere'; t: string; m: string }> = ref({
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
    <label>
      Verbo
      <select v-model="selectedVerb">
        <option v-for="p in Object.keys(weirdPresents)" :value="p">
          {{ p }}
        </option>
      </select>
    </label>
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
  </section>
  <section v-if="theme === 1">
    <table>
      <thead>
        <tr>
          <th>Verbo</th>
          <th>participio passato</th>
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
  <section v-if="theme === 2">
    <table>
      <tbody>
        <tr v-for="f in weirdFutures">
          <td>{{ f[0] }}</td>
          <td>{{ f[1] }}</td>
        </tr>
      </tbody>
    </table>
  </section>
  <section v-if="theme === 3">
    <section class="options">
      <FieldSelect
        title="Verbo"
        v-model="conj.v"
        :options="['essere', 'avere']"
      />
      <FieldSelect
        title="Modo"
        v-model="conj.m"
        :options="Object.keys(modes)"
      />
      <FieldSelect
        title="Tempo"
        v-model="conj.t"
        :options="modes[conj.m] || []"
      />
    </section>

    <table v-if="auxiliars[conj.v][conj.m][conj.t]">
      <thead>
        <tr>
          <th></th>
          <th>Essere</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in persons">
          <td>{{ p }}</td>
          <td>{{ auxiliars[conj.v][conj.m][conj.t]?.[p] ?? '' }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
