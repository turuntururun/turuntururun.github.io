<template>
  <div>
    <HeaderMenu @change="getSelection"></HeaderMenu>
    <Clock v-if="activeSection==='Reloj'"></Clock>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import Clock from "@/components/Clock";

export default {
  name: 'App',
  components: {
    HeaderMenu, Clock
  },
  data() {
    return {
      activeSection: ''
    }
  },
  methods: {
    getSelection(event) {
      this.activeSection = event;
    }
  }
}
</script>

<style>

body {
  margin: 0;
  padding: 0;
}

:root {
  font-family: "Fira Code", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
