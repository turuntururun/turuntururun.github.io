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

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
}

div {
  height: 100%;
}

:root {
  font-family: "Fira Code", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  --main-purple: #521C61;
  --bright-purple: #8c35a5;
}

</style>
