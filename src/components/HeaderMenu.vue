<template>
  <header>
    <h1 @click="goHome">TurunTururun</h1>
    <ul>
      <router-link v-for="section in allowedSections" :key="section.path" :to="section.path"
                   tag="li" active-class="selected" exact>
        {{ section.name }}
      </router-link>

    </ul>

    <section v-if="isAuthenticated" class="login" @click="logout">
      Cerrar Sesión
    </section>
    <router-link v-else class="login" tag="section" to="/login">
      Acceder
    </router-link>

  </header>
</template>

<script>
export default {
  name: "HeaderMenu",
  data() {
    return {}
  },
  computed: {
    sections() {
      return this.$router.options.routes
          .filter(value => !!value.name)
          .map(({name, authority, path}) => ({name, authority, path: path || '/'}))
    },
    allowedSections() {
      return this.sections
          .filter(value => !value.authority || this.$store.getters.authorities.includes(value.authority))
    },
    isAuthenticated() {
      return !!this.$store.state.token.access;
    }
  },
  methods: {
    goHome() {
      if (this.$router.currentRoute.path.substr(1)) {
        this.$router.push('/');
      }
    },
    logout() {
      this.$store.commit('clearToken');
      this.goHome();
    }
  }
}
</script>

<style lang="scss" scoped>

$desktop: "only screen and (min-width: 700px)";

@mixin nav-link {
  cursor: pointer;
  background-color: var(--bright-purple);
}

header {
  background-color: var(--main-purple);
  color: ghostwhite;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;

  @media #{$desktop} {
    flex-wrap: nowrap;
  }
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

  &.selected {
    background-color: var(--bright-purple);
    margin: 0 0.1rem;
  }

  &:hover {
    @include nav-link;
  }

}

section:hover {
  @include nav-link;
}

section.login {
  display: flex;
  align-items: center;
  margin: 0.5rem;
  border-radius: 0.4rem;
  padding: 0 0.6rem;
  outline: none;
  user-select: none;

  @media #{$desktop} {
    order: 3;
  }

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

</style>