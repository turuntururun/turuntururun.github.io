<template>
  <div>
    <HeaderMenu></HeaderMenu>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";

export default {
  name: 'App',
  components: {HeaderMenu},
  created() {
    this.$store.dispatch('restoreSession');
  }
}
</script>

<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
}

div {
  height: 100%;
  display: flex;
  flex-flow: column;
}

:root {
  font-family: "Fira Code", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  --main-purple: #521C61;
  --bright-purple: #8c35a5;
  --error-shade: #bb200b;
}

</style>
