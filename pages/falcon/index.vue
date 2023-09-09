<template>
  <div class="container">
    <header v-if="found.length > 4">
      <h4>Great job!!</h4>
      <button @click="restart">Restart</button>
    </header>
    <header v-else>
      Find:
      <Tile
        v-for="(s, i) in chips"
        :key="s"
        :background="found.includes(i) ? 'chartreuse' : ''"
        :content="s"
        :width="tileWidth"
        >{{ s }}
      </Tile>
    </header>

    <Board :key="boardKey" :tiles="80" @correct="add" @mounted="boardMounted" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'FalconGame',
  data: (): { found: number[]; chips: string[]; boardKey: string } => ({
    found: [],
    chips: [],
    boardKey: 'dummy-whatever',
  }),
  computed: {
    tileWidth() {
      return 100
    },
  },
  methods: {
    boardMounted(stuff: string[]) {
      this.chips = stuff
    },
    add(emoji: string) {
      const hit = this.chips.indexOf(emoji)
      if (!this.found.includes(hit)) this.found.push(hit)
    },
    restart() {
      this.found = []
      this.chips = []
      this.boardKey += '.'
    },
  },
})
</script>

<style scoped>
header {
  user-select: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 0.4rem 0;
  font-size: 32pt;
}

h4 {
  margin: 0.6rem 0;
}

button {
  color: ghostwhite;
  background: #5ccde0;
  padding: 0.5rem 1.2rem;
  font-size: 21pt;
  border: none;
  border-radius: 0.4rem;
}
</style>
