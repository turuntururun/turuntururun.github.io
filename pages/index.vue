<template>
  <div>
    <p>
      Todavía no sé qué poner en esta página, pero creo que pronto se me ocurre
      algo. Por ahora tengo un juego por
      <nuxt-link to="/falcon">aquí</nuxt-link>.
    </p>

    <nuxt-content :document="{ body: page.body }" />
    <pre>{{page}}</pre>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData ({ $content }) {
    const page = await $content('demo').fetch()
    return {
      page
    }
  }
})
</script>

<style scoped>
p {
  font-family: 'Bauhaus 93', AlienCaret, Arial, serif;
  font-size: 24pt;
  padding: 1rem 1.5rem;
}
</style>
