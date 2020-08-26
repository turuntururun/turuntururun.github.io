<template>
  <header>
    <h1>TurunTururun</h1>
    <ul>
      <li v-for="section in myStuff" :key="section" :class="{selected: selected===section}"
          @click="selected=section;$emit('change', section)">
        {{ section }}
      </li>
    </ul>
    <section v-if="hasLogin" class="login">Acceder</section>
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
        // 'Aplicaciones',
        // 'Mis Libros',
        // 'Trabajo',
      ],
      selected: 'Información',
      hasLogin: false
    }
  }
}
</script>

<style scoped>

header {
  background-color: var(--main-purple);
  color: whitesmoke;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
}

h1 {
  font-size: 27pt;
  padding: 0.1rem 1.3rem;
  margin: 0.6rem 0;
}

ul {

  order: 2;
  display: flex;
  flex-flow: row;
  align-items: center;
  list-style-type: none;
  flex-grow: 1;
  padding: 0.2rem;
  margin: 0.3rem;
  overflow: auto;
}

li {
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
}

li.selected {
  background-color: var(--bright-purple);
}

li:hover, section:hover {
  cursor: pointer;
  background-color: var(--bright-purple);
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

::-webkit-scrollbar {
  width: 0;
}

::-webkit-scrollbar-thumb {
  background: var(--bright-purple);
}

::-webkit-scrollbar-button {
  background: var(--bright-purple);
  margin: 0.1rem;
}

@media only screen and (min-width: 700px) {

  header {
    flex-wrap: nowrap;
  }

  section.login {
    order: 3;
  }

}

</style>