<template>
  <p
    :style="'font-size: ' + width *0.5 + 'px;background:' + background"
  >{{ content }}</p>
</template>

<script>
export default {
  name: "BoardTile",
  data() {
    return {c: 'x'}
  },
  props:
    ['content', 'width', 'background']

}
</script>

<style scoped>

p {
  text-align: center;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  padding: 0.25rem 0;
  margin: 0;
  cursor: grab;
}

</style>
