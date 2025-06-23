<template>
  <div class="container">
    <section
      class="board"
      :style="'grid-template-columns: repeat(' + tilesPerRow + ', 1fr)'"
    >
      <Tile
        v-for="(c,i) in chips"
        :key="i"
        :content="c"
        :size="tileWidth"
        :background="accent[i]||'none'"
        @click="selectEmoji(c)"
      />
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

import {randomEmojiSet} from '~/assets/emoji-store'

export default defineComponent({
  name: 'GameBoard',
  props: {
    tiles: { type: Number, default: 40 },
    accent: { type: Object, default: {}}
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
      return randomEmojiSet(this.finalTiles)
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
      //if (this.$el)
      //  return this.$el.clientWidth / 8
      return 3
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
      const i = this.selected.indexOf(emoji)
      if (i >= 0) {
        const index = this.chips.indexOf(emoji)
        this.$emit('correct', { emoji, index })
      }
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
.container {
  align-items: stretch;
}

.board {
  margin: 0;
  display: grid;
  border-left: 1px solid black;
  border-top: 1px solid black;
}
</style>
