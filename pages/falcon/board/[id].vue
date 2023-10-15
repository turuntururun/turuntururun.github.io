<script lang="ts">

// todo connect to websocket
// todo assign user id
// todo request display name
// todo coordinate game start

export default defineComponent({
  name: "multiplayer",
  data: (): { found: number[]; chips: string[]; } => ({
    found: [],
    chips: [],
  }),
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
    },
  }
})
</script>

<template>
  <pre>
    We are in board {{ this.$route.params.id }}
  </pre>

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
      <p>Kevin</p>
      <pre>{{ '✅'.repeat(found.length) + '⚪'.repeat(chips.length - found.length) }}</pre>
      <p>Frida: ✅⚪⚪✅⚪</p>
      <p>Maru: ✅✅⚪⚪⚪</p>
      <p>Cari: ✅✅⚪✅⚪</p>
      <p>Rafa: ⚪⚪✅⚪⚪</p>
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
