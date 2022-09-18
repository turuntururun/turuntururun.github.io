<template>
  <div>
    <p>
      Todavía no sé qué poner en esta página, pero creo que pronto se me ocurre
      algo. Por ahora tengo un juego por
      <nuxt-link to="/falcon">aquí</nuxt-link>
      y unas notas por <nuxt-link to="/notes">acá</nuxt-link>.
    </p>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
})
</script>

<style scoped>
p {
  font-family: 'Bauhaus 93', Arial, serif;
  font-size: 24pt;
  padding: 1rem 1.5rem;
}
</style>
