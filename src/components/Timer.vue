<template>
  <div>
    <button class="button is-primary" @click="vibrate">Brrrr!!</button>
  </div>
</template>

<script>
export default {
  name: "Timer",
  methods:{
    vibrate(){
      navigator.vibrate([70,25,60])
      // navigator.vibrate([230, 25,140,25,100])

    }
  }
}
</script>

<style scoped>

</style>