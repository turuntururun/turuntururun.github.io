<template>
  <div>
    <!-- TODO trabaja en el css de las cosas que se hacen aquí adentro -->
    <nuxt-content :document="{ body: page.body }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'

export default Vue.extend({
  name: 'IndexPage',
  head:{
    title: 'Notas'
  },
  async asyncData(ctx: Context): Promise<object> {
    const page = await ctx.$content('index').fetch()
    return { page }
  },
})
</script>

<style scoped>
p {
  font-family: 'Bauhaus 93', AlienCaret, Arial, serif;
  font-size: 24pt;
  padding: 1rem 1.5rem;
}
</style>
