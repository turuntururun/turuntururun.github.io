<template>
  <div>
    <h2>turuntururun</h2>
    <p>
      Hi there! There's no much going on around here, but we have a game
      <nuxt-link to="/falcon">here</nuxt-link>
      and some notes <nuxt-link to="/notes">over here</nuxt-link>.
    </p>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'IndexPage',
})
</script>

<style scoped>
h2{
  font-family: 'Bauhaus 93', Arial, sans-serif;
  text-align: center;
  font-size: 36pt;
  font-weight: lighter;
}

p {
  font-size: 24pt;
  padding: 1rem 1.5rem;
}

</style>
