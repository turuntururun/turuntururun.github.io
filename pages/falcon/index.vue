<template>
  <h1>Falcon</h1>
  <div class="container">
    <span>
      <Tile content="🕺" size="5"/>
    <nuxt-link to="/falcon/singleplayer">  Single Player Board</nuxt-link>
    </span>
    <span>
      <Tile content="👯" size="5"/>
      <button v-if="!message.text"
              @click="requestMultiplayerSession"> Create Multiplayer Session</button>
      <nuxt-link :to="message.target" v-if="message.type ==='success'">
        {{ message.text }}
      </nuxt-link>
      <span v-else-if="message.text">
        {{ message.text }}
      </span>
    </span>

  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {serverUrl} from "assets/global";

const message = ref({ type: 'info', text: 'Loading...', target: '' })

onMounted(()=> {
    axios.get(serverUrl + '/actuator/health')
      .then(response => {
        if (response.status == 200 && response.data.status == 'UP') {
          message.value.text = ''
        } else {
          message.value.text = 'Service unavailable'
        }
      }).catch(_ => {
        message.value.text = 'Service unavailable'
      })
  })

function requestMultiplayerSession() {
      // TODO display loading while requesting
      axios.post(serverUrl + '/board')
        .then(response => {
          if ((response.status == 201)) {
            const boardId = response.data
            message.value.type = 'success'
            message.value.text = 'Session "' + boardId + '" created'
            message.value.target = '/falcon/board/' + boardId
          }
        })

    }
</script>

<style lang="scss" scoped>
/* TODO Style page */

h1 {
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
