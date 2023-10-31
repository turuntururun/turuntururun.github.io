<script lang="ts">
import {defineComponent} from 'vue'
import {Client} from "@stomp/stompjs";
import {randomEmojiSet} from "assets/emoji-store";
import axios from 'axios';


const stompClient = new Client({
  // todo declare backend address as constant somewhere
  brokerURL: 'ws://turuntururun-falcon.us-west-2.elasticbeanstalk.com/falcon-websocket'
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

    axios.get('http://turuntururun-falcon.us-west-2.elasticbeanstalk.com/board/' + this.boardId)
      .then(response => {
        // fixme if response data contains current user, asume joined/connected
        this.score = response.data
        console.log('get response', response);
        this.connect()
      }).catch(e => {
      console.warn('Caught error', e)
      console.warn('Websocket not connected')
      // TODO replace with an error view if board is not available
    });


  },
  beforeUnmount() {
    this.disconnect()
  },
  computed: {
    boardId() {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('id')
    },
    joined() {
      return Object.keys(this.score).includes(this.session.userId)
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

      stompClient.activate();
    },
    disconnect() {
      stompClient.deactivate();
      console.log("Disconnected");
    },
    postPlayer() {
      // todo connect to websocket here?
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
        :size="3"
      >{{ s }}
      </Tile>
    </header>

    <section class="data-area">
      <!-- TODO Create component -->
      <div v-for="(score, user) in score" :key="user"
           style="display: flex;flex-flow: row wrap;justify-content: space-between">
        <span>{{ score.user.name }}</span>
        <span>{{ score.total }}</span>
        <span style="width: 100%">{{ '✅'.repeat(score.points) }}</span>
      </div>
    </section>

    <section class="game-board">
      <Board :key="boardKey" :tiles="80" @correct="add" @mounted="boardMounted"/>
    </section>

  </div>
  <section class="waiting" v-else>
    <h1>Session {{boardId}}</h1>
    <section class="name-row">
      <label>
        Name:
        <input v-model="session.userName">
      </label>
      <button class="action-button" @click="postPlayer">
        {{ joined ? 'Change name' : 'Join' }}
      </button>
    </section>
    <button :disabled="!joined" class="action-button" @click="()=>postEvent('start')">
      Start Game
    </button>

    <div v-for="(score, user) in score" :key="user"
         style="display: flex;flex-flow: row wrap;justify-content: space-between">
      <span>{{ score.user.name }} : {{ score.total }}</span>
    </div>
  </section>


</template>

<style scoped lang="scss">
.game-area {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: auto;
  grid-template-areas:
    "header data"
    "board board";

  header {
    grid-area: header;
    display: flex;
    flex-flow: row nowrap;
    font-size: 2em;
    justify-content: space-around;
    align-items: center;
  }

  .data-area {
    grid-area: data;
    padding: 1rem;
  }

  .game-board {
    grid-area: board;
  }

}


section.waiting {
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: 2rem;
  gap: 0.7rem;
  margin: 1.5rem;

  button, input {
    padding: 0.6rem 1.2rem;
    font-size: 1.5rem;
  }

  button {
    border-radius: 2rem;
    background: #00dc82;
    border-color: #65ea9b;
  }

}

section.name-row > * {
  margin: 0 1rem;
}

</style>
