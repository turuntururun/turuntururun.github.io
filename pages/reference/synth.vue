<script setup lang="ts">
import { voicingMap } from 'assets/data/sy1-voicings'
import Dashboard from '~/components/synth/dashboard.vue'

defineOptions({name: 'synth'})

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
          <input type="radio" :id="'type-' +t" name="type" :value="t" v-model="type" />
          <label :for="'type-' +t">{{ t }}</label>
        </div>
      </fieldset>

      <fieldset style="width: 18rem">
        <legend>Variation</legend>
        <div class="radio" v-for="(v, pos) in vars">
          <input type="radio" :id="'variation' +v" name="variation" :value="pos" v-model="variation" />
          <label v-if="v.includes('(')" :for="'variation' +v">
            {{ pos + 1 }} - {{ v.substring(0, v.indexOf('(')) }}
            <sup v-if="v.includes('PITCH CONTROL')" aria-label="PITCH CONTROL">🎶👣</sup>
            <sup v-if="v.includes('Octave Down')" aria-label="Octave Down on Lower Notes Only">🎼🔽</sup>
          </label>
          <label v-else :for="'variation' +v">{{ pos + 1 }} - {{ v }}</label>
        </div>
      </fieldset>
    </form>

    <section style="width: 25rem" class="column">
      <pre>  {{ type }} - {{ vars[variation] }}</pre>
      <dashboard v-if="control"
                 :inner-knob="control.c1"
                 :outer-knob="control.c2"
                 :variation="variation"
                 :type="types.indexOf(type)"
      />
    </section>

  </section>
</template>

<style scoped>

.row-wrapped {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem
}

.row-no-wrap {
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem
}

.column {
  display: flex;
  flex-flow: column;
}

.radio {
  display: flex
}

</style>
