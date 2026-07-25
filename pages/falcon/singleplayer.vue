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
        :size="tileWidth"
        >{{ s }}
      </Tile>
    </header>

    <client-only>
    <Board :key="boardKey" :accent="accent" :tiles="80" @correct="add" @mounted="boardMounted" />
    </client-only>

  </div>
</template>

<script lang="ts" setup>


const found = ref<number[]>([])
const chips = ref<string[]>([])
const boardKey = ref('dummy-whatever')
const accent = ref<{ [tile: number]: string }>({})

const tileWidth = computed(() => 4)

function boardMounted(stuff: string[]) {
  chips.value = stuff
}

function add(data: { emoji: string, index: number }) {
  const hit = chips.value.indexOf(data.emoji)
  accent.value[data.index] = 'chartreuse'
  if (!found.value.includes(hit)) found.value.push(hit)
}

function restart() {
  found.value = []
  chips.value = []
  accent.value = {}
  // fixme ugly hack
  boardKey.value += '.'
}

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
