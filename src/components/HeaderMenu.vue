<template>
  <header>
    <h1 @click="goHome">TurunTururun</h1>
    <ul>
      <router-link v-for="section in myStuff" :key="section.path" :to="section.path"
                   tag="li" active-class="selected" exact>
        {{ section.name }}
      </router-link>

    </ul>

    <router-link v-if="login" to="/login" tag="section" class="login">
      Acceder
    </router-link>

  </header>
</template>

<script>
export default {
  name: "HeaderMenu",
  data() {
    return {
      myStuff: [
        {name: 'Información', path: '/'},
        {name: 'Reloj', path: '/clock'},
        // 'Aplicaciones',
        // 'Mis Libros',
        // 'Trabajo',
      ],
      login: false
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

header {
  background-color: var(--main-purple);
  color: ghostwhite;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
}

h1 {
  font-size: 27pt;
  padding: 0.1rem 1.3rem;
  margin: 0.6rem 0;
  user-select: none;
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
  border-radius: 0.4rem;
  user-select: none;
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
  user-select: none;
  outline: none;
}

section.login {
  display: flex;
  align-items: center;
  margin: 0.5rem;
  border-radius: 0.4rem;
  padding: 0 0.6rem;
  outline: none;
  user-select: none;
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