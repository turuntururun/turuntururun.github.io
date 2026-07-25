<script setup lang="ts">
import { voicingMap } from 'assets/data/sy1-voicings'
import Dashboard from '~/components/synth/dashboard.vue'

defineOptions({ name: 'synth' })

const type = ref('LEAD1')
const variation = ref(0)

const types = computed(() => Object.keys(voicingMap))

const vars = computed(() => Object.keys(voicingMap[type.value] || {}))

const control = computed(() => {
  const t = voicingMap[type.value]
  return t[vars.value[variation.value]]
})
</script>

<template>
  <NuxtLink to="/">🏠</NuxtLink>
  <section class="row-wrapped">
    <form class="row-no-wrap">
      <fieldset style="width: 7rem">
        <legend>Type</legend>
        <div class="radio" v-for="t in types">
          <label :class="{ selected: type === t }">
            <input type="radio" name="type" :value="t" v-model="type" />
            {{ t }}
          </label>
        </div>
      </fieldset>

      <fieldset style="width: 18rem">
        <legend>Variation</legend>
        <div class="radio" v-for="(v, pos) in vars">
          <label :class="{ selected: variation === pos }">
            <input
              type="radio"
              style="display: none"
              name="variation"
              :value="pos"
              v-model="variation"
            />
            {{ pos + 1 }} -
            {{ v.includes('(') ? v.substring(0, v.indexOf('(')) : v }}
            <span v-if="v.includes('PITCH CONTROL')" title="PITCH CONTROL">
              <sup aria-label="PITCH CONTROL">🎶👣</sup>
            </span>
            <span
              v-if="v.includes('Octave Down')"
              title="Octave Down on Lower Notes Only"
            >
              <sup aria-label="Octave Down on Lower Notes Only">🎼🔽</sup>
            </span>
          </label>
        </div>
      </fieldset>
    </form>

    <section style="width: 25rem" class="column">
      <pre>  {{ type }} - {{ vars[variation] }}</pre>
      <dashboard
        v-if="control"
        :inner-knob="control.c1"
        :outer-knob="control.c2"
        :variation="variation"
        :type="types.indexOf(type)"
      />
    </section>
  </section>
</template>

<style scoped lang="scss">
.row-wrapped {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
}

.row-no-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
}

.column {
  display: flex;
  flex-flow: column;
}

.radio {
  display: flex;
}
</style>
