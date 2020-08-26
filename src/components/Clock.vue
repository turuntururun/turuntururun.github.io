<template>

  <div>

    <h1 @click.stop="reset">{{ currentTime }}</h1>

    <button :class="{paused,running:!paused}" type="button"
            @click.stop="controlPause">
      Pausa
    </button>

  </div>

</template>

<script>
import NoSleep from 'nosleep.js';

const noSleep = new NoSleep();

export default {
  name: "Clock",
  data() {
    return {
      dayStart: 6,
      minutes: 0,
      paused: false
    }
  },
  computed: {
    currentTime() {
      let hours = Math.trunc((this.dayStart + this.minutes / 60) % 24);
      let minutes = this.minutes % 60;
      return this.pad(hours) + ':' + this.pad(minutes);
    }
  },
  methods: {
    reset() {
      this.minutes = 0;
    },
    advance() {
      if (!this.paused)
        this.minutes += 3;
      setTimeout(this.advance, 500)
    },
    controlPause() {
      this.paused = !this.paused;
      if (this.paused) {
        noSleep.disable();
      } else {
        noSleep.enable();
      }
    },
    pad(number) {
      return number.toString().padStart(2, '0')
    }
  },
  mounted() {
    setTimeout(this.advance, 1000);
    noSleep.enable();
  }
}
</script>

<style scoped>

@media (orientation: landscape) {
  div {
    flex-flow: row;
    justify-content: space-evenly;
  }
}

@media (orientation: portrait) {
  div {
    flex-flow: column;
  }
}

h1 {
  font-size: 96pt;
  color: bisque;
}

div {
  display: flex;
  align-items: center;
  background-color: #2c3e50;
}

button {
  padding: 15px;
  font-size: 24pt;
  border: transparent;
  opacity: 1;
}

button.running {
  background-color: #4a6a8d;
  color: bisque;
}

button.paused {
  background-color: bisque;
  color: #4a6a8d;
}

</style>