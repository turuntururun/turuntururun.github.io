<script lang="ts">
import {defineComponent} from 'vue'
import {Client} from "@stomp/stompjs";

const stompClient = new Client({
  brokerURL: 'ws://localhost:8080/falcon-websocket'
});


stompClient.onWebSocketError = (error) => {
  console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
  console.error('Broker reported error: ' + frame.headers['message']);
  console.error('Additional details: ' + frame.body);
};
export default defineComponent({
  name: "multiplayer",
  data() {
    return {connected: false, message: '', name:''}
  },
  mounted() {

    stompClient.onConnect = (frame) => {

      this.connected = true
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/greetings', (response) => {
        console.log('topic message', response)
        this.message = response.body
      });
    };

  },
  methods: {
    connect() {
      stompClient.activate();
    },
    disconnect() {
      stompClient.deactivate();
      this.connected = false
      console.log("Disconnected");
    },
    sendName() {
      let value = {player: this.name};
      console.log('send', value)
      stompClient.publish({
        destination: "/app/hello",
        body: JSON.stringify({'name': this.name})
      });
    }

  }
})
</script>

<template>
  <div class="row">
    <div class="col-md-6">
      <form class="form-inline" @submit.prevent="">
        <div class="form-group">
          <label for="connect">WebSocket connection:</label>
          <button id="connect" :disabled="connected" class="btn btn-default" type="button" @click="connect">Connect
          </button>
          <button id="disconnect" :disabled="!connected" class="btn btn-default" type="button" disabled="disabled"
                  @click="disconnect">Disconnect
          </button>
        </div>
      </form>
    </div>
    <div class="col-md-6">
      <form class="form-inline">
        <div class="form-group">
          <label for="name">What is your name?</label>
          <input type="text" id="name" v-model="name" class="form-control" placeholder="Your name here...">
        </div>
        <button id="send" class="btn btn-default" type="button" @click="sendName">Send</button>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <table id="conversation" class="table table-striped" v-show="connected">
        <thead>
        <tr>
          <th>Greetings</th>
        </tr>
        </thead>
        <tbody id="greetings">
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
