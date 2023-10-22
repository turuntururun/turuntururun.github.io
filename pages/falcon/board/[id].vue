<script lang="ts">
import {defineComponent} from 'vue'
import {Client} from "@stomp/stompjs";
import {randomEmojiSet} from "assets/emoji-store";


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

// todo animate game start/end/restart

export default defineComponent({
  name: "multiplayer",
  data: (): {
    found: number[];
    chips: string[];
    boardKey: string;
    score: { [user: string]: { points: number; total: number } };
    session: {
      playing: boolean,
      userName: string
      userId: string
    }
  } => ({
    boardKey: 'boardKey',
    found: [],
    chips: [],
    score: {},
    session: {
      playing: false,
      userId: randomEmojiSet(8).join(''),
      userName: 'Player ' + randomEmojiSet(2).join('')
    }
  }),
  mounted() {
    this.session.userId = localStorage.getItem('falcon-user-id') || this.session.userId
    localStorage.setItem('falcon-user-id', this.session.userId)

    this.session.userName = localStorage.getItem('falcon-user-name') || this.session.userName
    localStorage.setItem('falcon-user-name', this.session.userName)

    console.log('We are in board', this.boardId)
    // todo validate boardId is valid on BE then caonnect or redirect

    stompClient.onConnect = (frame) => {

      // this.connected = true
      // todo handle connection issues
      console.log('Connected: ' + JSON.stringify(frame));
      stompClient.subscribe('/topic/' + this.boardId + '/user-score', (response) => {
        console.log('/user-score', 'body', response.body)
        this.score = JSON.parse(response.body)
      });
      stompClient.subscribe('/topic/' + this.boardId + '/events', (response) => {
        console.log('/events', 'body', response.body)
        switch (response.body) {
          case 'start':
            this.session.playing = true
            return
          case 'stop':
            this.session.playing = false
            this.restart()
            return
        }
        // TODO animate to game events
      });
    };

    this.connect()

  },
  beforeUnmount() {
    this.disconnect()
  },
  computed: {
    boardId() {
      return this.$route.params.id
    }
  },
  methods: {
    boardMounted(stuff: string[]) {
      this.chips = stuff
    },
    add(emoji: string) {
      const hit = this.chips.indexOf(emoji)
      if (!this.found.includes(hit)) {
        this.found.push(hit)
        this.postPoint()
      }
      if ((this.found.length === 5)) {
        this.postEvent('stop')
      }
    },
    restart() {
      this.found = []
      this.chips = []
      this.boardKey += '.'
    },
    connect() {
      stompClient.activate();
    },
    disconnect() {
      // todo remove player from backend cache?
      stompClient.deactivate();
      console.log("Disconnected");
    },
    postPlayer() {
      // todo connect to websocket here
      localStorage.setItem('falcon-user-name', this.session.userName)
      stompClient.publish({
        destination: "/board/" + this.boardId + "/player",
        body: JSON.stringify({id: this.session.userId, name: this.session.userName})
      });
    },
    postEvent(eventType: string) {
      stompClient.publish({
        destination: "/board/" + this.boardId + "/event",
        body: eventType
      });
    },
    postPoint() {
      stompClient.publish({
        destination: "/board/" + this.boardId + "/score",
        body: this.session.userId
      });
    }
  }
})
</script>

<template>

  <div class="game-area" v-if="session.playing">

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
      <Board :key="boardKey" :tiles="80" @correct="add" @mounted="boardMounted"/>
    </section>

    <section class="data-area">
      <!-- TODO Create component -->
      <div v-for="(score, user) in score" :key="user"
           style="display: flex;flex-flow: row wrap;justify-content: space-between">
        <span>{{ score.user.name }}</span>
        <span>{{ score.total }}</span>
        <span style="width: 100%">{{ '✅'.repeat(score.points) }}</span>
      </div>
    </section>

  </div>
  <div v-else>
    <label>
      Name:
      <input v-model="session.userName">
    </label>
    <!-- TODO join websocket on demand and display players on connect -->
    <button @click="postPlayer">
      Join
    </button>
    <button @click="()=>postEvent('start')">
      Start Game
    </button>


    <div v-for="(score, user) in score" :key="user"
         style="display: flex;flex-flow: row wrap;justify-content: space-between">
      <span>{{ score.user.name }} : {{ score.total }}</span>
    </div>
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
