<template>
  <p
    :style="'font-size: '
    + size
    + 'pc;background:' + background"
  >{{ content }}</p>
</template>

<script>
export default {
  name: "BoardTile",
  props:
    ['content', 'size', 'background'],
  computed: {}

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
