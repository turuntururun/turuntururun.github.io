<script lang="ts">
import { defineComponent } from 'vue'
import { voicingMap } from 'assets/data/sy1-voicings'
import Dashboard from '~/components/synth/dashboard.vue'

export default defineComponent({
  name: 'synth',
  components: { Dashboard },
  data: () => ({
    type: 'LEAD1',
    variation: 0
  }),
  computed: {
    types() {
      return Object.keys(voicingMap)
    },
    vars() {
      return Object.keys(voicingMap[this.type] || {})
    },
    control() {
      const t = voicingMap[this.type]
      return t[this.vars[this.variation]]
    }
  }
})
</script>

<template>
  <NuxtLink to="/public">🏠</NuxtLink>
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
