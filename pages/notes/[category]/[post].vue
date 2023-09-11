<template>
  <ContentDoc :path="$route.params.category +'/' +  $route.params.post" class="content"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Post',
})
</script>

<style scoped></style>
