<template>
  <!-- todo create header component -->
    <div class="container">
      <header>
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

      <Board
        :key="boardKey"
        :tiles="80"
        @correct="add"
        @mounted="boardMounted"
      />

      <!-- todo improve section and create header component -->
      <footer v-if="found.length > 4">
        <h2>Great job!!</h2>
        <button @click="restart">Restart</button>
      </footer>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: 'FalconGame',
  data: (): { found: number[]; chips: string[]; boardKey: string } => ({
    found: [],
    chips: [],
    boardKey: "dummy-whatever"
  }),
  computed: {
    tileWidth() {
      return this.$el.clientWidth / 7;
    }
  },
  methods: {
    boardMounted(stuff: string[]) {
      this.chips = stuff;
    },
    add(emoji: string) {
      this.found.push(this.chips.indexOf(emoji));
    },
    restart() {
      this.found = [];
      this.chips = [];
      this.boardKey += ".";
    }
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

footer {
  display: flex;
  flex-flow: column;
  align-items: center;
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
