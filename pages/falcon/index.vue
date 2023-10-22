<template>
  <div class="container">
    <nuxt-link to="/falcon/singleplayer">Single Player Board</nuxt-link>
    <button @click="requestMultiplayerSession">Create Multiplayer Session</button>
    <nuxt-link :to="message.target" v-if="message.type ==='success'">
      {{ message.text }}
    </nuxt-link>
    <!-- TODO handle message.type == error -->
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'FalconGameIndex',
  data: () => ({message: {type: 'info', text: '', target: ''}}),
  methods: {
    requestMultiplayerSession() {
      // TODO request session in backend
      // TODO display loading while requesting
      const boardId = '🎧𓀄🚩♤🧓'
      this.message.type = 'success'
      this.message.text = 'Session "' + boardId + '" created'
      this.message.target = '/falcon/board/' + boardId
    }
  }
})
</script>

<style scoped>
/* TODO Style page */

.container {
  display: flex;
  flex-flow: column nowrap;
}

</style>
