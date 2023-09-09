<template>
  <div>
    <section
      class="board"
      :style="'grid-template-columns: repeat(' + tilesPerRow + ', 1fr)'"
    >
      <Tile
        v-for="c in chips"
        :key="c"
        :content="c"
        :width="tileWidth"
        @click="selectEmoji(c)"
      />
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

import { uniqueEmojis } from '~/assets/emoji-store'

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

export default defineComponent({
  name: 'GameBoard',
  props: {
    tiles: { type: Number, default: 40 },
  },
  data() {
    return {
      // todo read from cache
      size: {
        height: -1,
        width: -1,
      },
      finalTiles: this.tiles,
      tilesPerRow: 10,
    }
  },
  computed: {
    chips(): string[] {
      const data = [...uniqueEmojis]
      shuffleArray(data)
      return data.slice(0, this.finalTiles)
    },
    selected(): string[] {
      const set = new Set<string>()
      while (set.size < 5) {
        set.add(this.chips[Math.floor(Math.random() * this.chips.length)])
      }
      return [...set]
    },
    /* todo calc tile layout according to display */
    tileWidth(): number {
      //if (!this.$el)
      return 80
      //return this.$el.clientWidth / 8
    },
  },
  mounted() {
    this.size.height = this.$el.clientHeight
    this.size.width = this.$el.clientWidth
    this.setTilesPerRow()
    this.$emit('mounted', this.selected)
  },
  methods: {
    selectEmoji(emoji: string) {
      const index = this.selected.indexOf(emoji)
      if (index >= 0) this.$emit('correct', emoji)
    },
    setTilesPerRow() {
      this.tilesPerRow = Math.floor(this.size.width / 100)
      this.finalTiles =
        this.tilesPerRow * Math.ceil(this.tiles / this.tilesPerRow)
    },
  },
})
</script>

<style scoped>
.board {
  margin: 0;
  display: grid;
  border-left: 1px solid black;
  border-top: 1px solid black;
}
</style>
