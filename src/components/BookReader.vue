<template>

  <div>

    <h1>Lector de libros</h1>

  </div>

</template>

<script>
export default {
  name: "BookReader",
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