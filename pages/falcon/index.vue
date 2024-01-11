<template>
  <h1>Falcon</h1>
  <div class="container">
    <span>
      <Tile content="🕺" size="5"/>
    <nuxt-link to="/falcon/singleplayer">  Single Player Board</nuxt-link>
    </span>
    <!-- TODO disable if backend is down -->
    <span v-if="multiplayerEnabled">
      <Tile content="👯" size="5"/>
      <button v-if="!message.text" @click="requestMultiplayerSession"> Create Multiplayer Session</button>
      <nuxt-link :to="message.target" v-if="message.type ==='success'">
        {{ message.text }}
      </nuxt-link>
      <!-- TODO handle message.type == error -->
    </span>

  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";
import {serverUrl} from "assets/global";

export default defineComponent({
  name: 'FalconGameIndex',
  data: () => ({message: {type: 'info', text: '', target: ''},
    // todo connect to backend and check availability
    multiplayerEnabled: true
  }),
  methods: {
    requestMultiplayerSession() {
      // TODO display loading while requesting
      axios.post(serverUrl+'/board')
        .then(response => {
          console.log(response);
          if ((response.status == 201)) {
            const boardId = response.data
            this.message.type = 'success'
            this.message.text = 'Session "' + boardId + '" created'
            //this.message.target = '/falcon/board/' + boardId
            this.message.target = '/falcon/board?id=' + boardId

          }
        })

    }
  }
})
</script>

<style lang="scss" scoped>
/* TODO Style page */

h1{
  margin: 1.2rem auto;
  text-align: center;
  font-family: 'Bauhaus 93', Arial, serif;
  font-size: 3.5rem;
}
.container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 3rem;
  font-size: 1.5rem;

  span {
    padding: 1.3rem 2.7rem;
    display: flex;
    flex-flow: column;
    border: 4px solid teal;
    border-radius: 0.5rem;
    background: #c9eeee;

    * {
      margin-bottom: 0.5rem;
    }
  }

  button {
    font-size: 1.5rem;
    border-radius: 2rem;
    color: ghostwhite;
    background: #00dc82;
    border-color: #65ea9b;
  }

}

</style>
