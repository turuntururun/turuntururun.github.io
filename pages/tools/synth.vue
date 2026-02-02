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
  <section>
    <NuxtLink to="/">🏠</NuxtLink>

    <form>

      <fieldset>
        <legend>Type</legend>
        <div class="radio" v-for="t in types">
          <input type="radio" :id="'type-' +t" name="type" :value="t" v-model="type" />
          <label :for="'type-' +t">{{ t }}</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Variation</legend>
        <div class="radio" v-for="(v, pos) in vars">
          <input type="radio" :id="'variation' +v" name="variation" :value="pos" v-model="variation" />
          <label :for="'variation' +v">{{ pos + 1 }} - {{ v }}</label>
        </div>
      </fieldset>

    </form>

    <pre>  {{ type }} - {{ vars[variation] }}</pre>
    <dashboard v-if="control" :inner-knob="control.c1" :outer-knob="control.c2" />

  </section>
</template>

<style scoped>

form {
  display: flex;
  flex-flow: row;
  gap: 1rem
}

.radio {
  display: flex
}

</style>
