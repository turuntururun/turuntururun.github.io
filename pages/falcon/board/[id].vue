<script lang="ts">
import {defineComponent} from 'vue'
import {Client} from "@stomp/stompjs";


const stompClient = new Client({
  brokerURL: 'ws://192.168.1.73:8080/falcon-websocket'
});

stompClient.onWebSocketError = (error) => {
  console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
  console.error('Broker reported error: ' + frame.headers['message']);
  console.error('Additional details: ' + frame.body);
};

// todo assign user id
// todo request display name
// todo coordinate game start/end/restart

export default defineComponent({
  name: "multiplayer",
  data: (): { found: number[]; chips: string[]; score: { [user: string]: { points: number; total: number } } } => ({
    found: [],
    chips: [],
    score: {}
  }),
  mounted() {

    console.log('We are in board', this.$route.params.id)

    stompClient.onConnect = (frame) => {

      // this.connected = true
      // todo handle connection issues
      console.log('Connected: ' + JSON.stringify(frame));
      stompClient.subscribe('/topic/greetings', (response) => {
        console.log('topic message', response)
        console.log('topic message body', response.body)
        this.score = JSON.parse(response.body)
      });
    };

    this.connect()

  },
  beforeUnmount() {
    this.disconnect()
  },
  methods: {
    boardMounted(stuff: string[]) {
      this.chips = stuff
    },
    add(emoji: string) {
      const hit = this.chips.indexOf(emoji)
      if (!this.found.includes(hit)) {
        this.found.push(hit)
        this.sendData()
      }
    },
    restart() {
      this.found = []
      this.chips = []
    },

    connect() {
      stompClient.activate();
    },
    disconnect() {
      stompClient.deactivate();
      // this.connected = false
      console.log("Disconnected");
    },
    sendData() {
      stompClient.publish({
        destination: "/score",
        body: 'Gordito'
      });
    }
  }
})
</script>

<template>

  <div class="game-area">

    <header>
      Find:
      <Tile
        v-for="(s, i) in chips"
        :key="s"
        :background="found.includes(i) ? 'chartreuse' : ''"
        :content="s"
        :width="100"
      >{{ s }}
      </Tile>
    </header>


    <section class="game-board">
      <Board :key="'boardKey'" :tiles="80" @correct="add" @mounted="boardMounted"/>
    </section>

    <section class="data-area">
      <!-- TODO Create component -->
      <div v-for="(score, user) in score" :key="user" style="display: flex;flex-flow: row wrap;justify-content: space-between">
        <span>{{user}}</span>
        <span>{{score.total}}</span>
        <span style="width: 100%">{{'✅'.repeat(score.points)}}</span>
      </div>
    </section>


  </div>


</template>

<style scoped>
.game-area {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: auto;

}

header {
  display: flex;
  flex-flow: row nowrap;
}

.data-area {
  padding: 1rem;
  grid-area: 1 / 2 / last-line / last-line;
}
</style>
