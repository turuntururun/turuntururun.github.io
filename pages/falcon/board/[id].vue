<script setup lang="ts">
import { Client } from '@stomp/stompjs'
import { randomEmojiSet } from 'assets/emoji-store'
import axios from 'axios'
import { serverUrl } from 'assets/global'

const boardId = useRoute().params.id

const stompClient = new Client({
  brokerURL: serverUrl.replace('https', 'wss') + '/falcon-websocket',
})

stompClient.onWebSocketError = (error) => {
  console.error('Error with websocket', error)
}

stompClient.onStompError = (frame) => {
  console.error('Broker reported error: ' + frame.headers['message'])
  console.error('Additional details: ' + frame.body)
}

// todo animate game start/end/restart

const boardKey = ref('boardKey')
const found = ref<number[]>([])
const chips = ref<string[]>([])
const score = ref<{
  [user: string]: {
    points: number
    total: number
    user: { name: string }
  }
}>({})
const accent = ref<{ [tile: number]: string }>({})
const session = ref({
  playing: false,
  userId: randomEmojiSet(8).join(''),
  userName: 'Player ' + randomEmojiSet(2).join(''),
})

onMounted(() => {
  session.value.userId =
    localStorage.getItem('falcon-user-id') || session.value.userId
  localStorage.setItem('falcon-user-id', session.value.userId)

  session.value.userName =
    localStorage.getItem('falcon-user-name') || session.value.userName
  localStorage.setItem('falcon-user-name', session.value.userName)

  console.debug('We are in board', boardId)

  axios
    .get(serverUrl + '/board/' + boardId)
    .then((response) => {
      // fixme if response data contains current user, asume joined/connected
      score.value = response.data
      console.debug('get response', response)
      connect()
    })
    .catch((e) => {
      console.warn('Caught error', e)
      navigateTo('/falcon')
    })
})
onBeforeUnmount(() => {
  disconnect()
})

const joined = computed(() => {
  return Object.keys(score.value).includes(session.value.userId)
})

function boardMounted(stuff: string[]) {
  chips.value = stuff
}

function add(data: { emoji: string; index: number }) {
  console.log('emmitted', data)
  const { emoji, index } = data
  const hit = chips.value.indexOf(emoji)
  accent.value[index] = 'chartreuse'
  if (!found.value.includes(hit)) {
    found.value.push(hit)
    postPoint()
  }
  if (found.value.length === 5) {
    postEvent('stop')
  }
}

function restart() {
  found.value = []
  chips.value = []
  accent.value = {}
  boardKey.value += '.'
}

function connect() {
  stompClient.onConnect = (frame) => {
    // todo handle connection issues
    console.debug('Connected: ' + JSON.stringify(frame))
    stompClient.subscribe('/topic/' + boardId + '/user-score', (response) => {
      console.debug('/user-score', 'body', response.body)
      score.value = JSON.parse(response.body)
    })
    stompClient.subscribe('/topic/' + boardId + '/events', (response) => {
      console.debug('/events', 'body', response.body)
      switch (response.body) {
        case 'start':
          session.value.playing = true
          return
        case 'stop':
          session.value.playing = false
          restart()
          return
      }
      // TODO animate to game events
    })
  }

  stompClient.activate()
}

function disconnect() {
  stompClient.deactivate()
  console.debug('Disconnected')
}

function postPlayer() {
  // todo connect to websocket here?
  localStorage.setItem('falcon-user-name', session.value.userName)
  stompClient.publish({
    destination: '/board/' + boardId + '/player',
    body: JSON.stringify({
      id: session.value.userId,
      name: session.value.userName,
    }),
  })
}

function postEvent(eventType: string) {
  stompClient.publish({
    destination: '/board/' + boardId + '/event',
    body: eventType,
  })
}

function postPoint() {
  stompClient.publish({
    destination: '/board/' + boardId + '/score',
    body: session.value.userId,
  })
}
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
      <div
        v-for="(score, user) in score"
        :key="user"
        style="
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
        "
      >
        <h4 style="margin: 0.5rem">{{ score.user.name }}</h4>
        <h4 style="margin: 0.5rem">{{ score.total }}</h4>
        <span v-if="score.points > 0" style="width: 100%">{{
          '✅'.repeat(score.points)
        }}</span>
        <span v-else style="width: 100%">🤔</span>
      </div>
    </section>

    <section class="game-board">
      <Board
        :key="boardKey"
        :tiles="80"
        :accent="accent"
        @correct="add"
        @mounted="boardMounted"
      />
    </section>
  </div>
  <section class="waiting" v-else>
    <h1>Session {{ boardId }}</h1>
    <div class="container">
      <section class="name-row">
        <label>
          Name:
          <input maxlength="20" v-model="session.userName" />
        </label>
        <button class="action-button" @click="postPlayer">
          {{ joined ? 'Change name' : 'Join' }}
        </button>
      </section>
      <button
        :disabled="!joined"
        class="action-button"
        @click="() => postEvent('start')"
      >
        Start Game
      </button>

      <div
        style="
          display: flex;
          flex-flow: column-reverse;
          justify-content: space-between;
        "
      >
        <span
          v-for="(score, user) in score"
          :key="user"
          :style="{ order: score.total }"
          >{{ score.user.name }} : {{ score.total }}</span
        >
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.game-area {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: auto;
  grid-template-areas:
    'header data'
    'board board';

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
  margin: 1.5rem;
}

.container {
  display: flex;
  flex-flow: column;
  gap: 1.5rem;
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  button,
  input {
    padding: 0.6rem 1.2rem;
    font-size: 1.5rem;
  }

  button {
    border-radius: 2rem;
    font-weight: bold;
    background: #00dc82;
    border-color: #65ea9b;
  }
}

section.name-row > * {
  margin: 0 1rem;
}
</style>
