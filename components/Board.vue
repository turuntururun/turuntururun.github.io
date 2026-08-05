<template>
  <div class="container">
    <section
      class="board"
      :style="'grid-template-columns: repeat(' + tilesPerRow + ', 1fr)'"
    >
      <Tile
        v-for="(c, i) in chips"
        :key="i"
        :content="c"
        :size="tileWidth"
        :background="props.accent[i] || 'none'"
        @click="selectEmoji(c)"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { randomEmojiSet } from '~/assets/emoji-store'
import { ref } from 'vue'
//export default defineComponent({
//  name: 'GameBoard',
//  props: {
const props = withDefaults(
  defineProps<{
    tiles: number
    accent: any // fixme set type correctly
  }>(),
  {
    //    tiles: { type: Number, default: 40 },
    tiles: 40,
    //    accent: { type: Object, default: {}}
    accent: {},
  },
)
//  },
//  data() {
//    return {
//      // todo read from cache
//      size: {
const size = ref({
  //        height: -1,
  height: -1,
  //        width: -1,
  width: -1,
  //      },
})
const finalTiles = ref(props.tiles)
//      tilesPerRow: 10,
const tilesPerRow = ref(10)
//    }
//  },
//  computed: {
//    chips(): string[] {
const chips = computed(() => {
  return randomEmojiSet(finalTiles.value)
})
//    selected(): string[] {
const selected = computed(() => {
  const set = new Set<string>()
  while (set.size < 5) {
    set.add(chips.value[Math.floor(Math.random() * chips.value.length)])
  }
  return [...set]
})
//    /* todo calc tile layout according to display */
//    tileWidth(): number {
const tileWidth = computed(() => {
  //if (this.$el)
  //  return this.$el.clientWidth / 8
  return 3
})
//  },
function setTilesPerRow() {
  tilesPerRow.value = Math.floor(size.value.width / 100)
  finalTiles.value =
    tilesPerRow.value * Math.ceil(props.tiles / tilesPerRow.value)
}

//  mounted() {

const emit = defineEmits(['mounted', 'correct'])
onMounted(() => {
  // fixme ugly hack
  const el = getCurrentInstance()?.proxy?.$el
  size.value.height = el.clientHeight
  size.value.width = el.clientWidth
  setTilesPerRow()
  emit('mounted', selected.value)
})
//  methods: {
function selectEmoji(emoji: string) {
  const i = selected.value.indexOf(emoji)
  if (i >= 0) {
    const index = chips.value.indexOf(emoji)
    // this.$emit('correct', { emoji, index })
    emit('correct', { emoji, index })
  }
}
//  },
//})
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
