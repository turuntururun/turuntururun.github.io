<template>
  <header>
    <h1>TurunTururun</h1>
    <ul>
      <li v-for="section in myStuff" :key="section" @click="selected=section,$emit('change', section)"
          :class="{selected: selected===section}">
        {{ section }}
      </li>
    </ul>
    <section class="login">Acceder</section>
  </header>
</template>

<script>
export default {
  name: "HeaderMenu",
  data() {
    return {
      myStuff: [
        'Información',
        'Reloj',
        'Aplicaciones',
        // 'Mis Libros',
        // 'Trabajo',
      ],
      selected: 'Información'
    }
  }
}
</script>

<style scoped>

header {
  background-color: #521C61;
  color: whitesmoke;
  display: flex;
  flex-flow: row;
}

h1 {
  font-size: 27pt;
  padding: 0.1rem 1.3rem;
}

ul {
  display: flex;
  flex-flow: row;
  align-items: center;
  list-style-type: none;
  flex-grow: 1;
  padding: 0;
  margin: 0;
}

li {
  padding: 0 1rem;
  height: 60%;
  display: flex;
  align-items: center;
}

li.selected {
  background-color: #8c35a5;
}

li:hover, section:hover {
  cursor: pointer;
  background-color: #8c35a5;
}

li > a {
  color: ghostwhite;
  text-decoration: none;
}

section.login {
  display: flex;
  align-items: center;
  margin: 0.5rem;
}

</style>