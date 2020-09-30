<template>

  <form @submit.prevent="requestLogin">
    <label>
      <span>Usuario</span>
      <input v-model="username" required type="email">
    </label>
    <label>
      <span>Contraseña</span>
      <input v-model="password" required type="password">
    </label>
    <button>Entrar</button>
    <label class="error">{{ errorMessage }}</label>
  </form>

</template>

<script>
import shajs from 'sha.js'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    requestLogin: function () {
      this.errorMessage = '';
      this.$store.dispatch('login', {
        username: this.username,
        password: this.hash(this.password)
      }).then(value => {
        console.log('requestLogin result', value);
        this.$router.push('/');
      }).catch(reason => {
        if (reason.toJSON().message.includes('400')) {
          this.errorMessage = 'Credenciales Incorrectas'
        } else {
          this.errorMessage = reason
        }
      });
    },
    hash(value) {
      return shajs('sha256')
          .update(value)
          .digest('hex');
    }
  }
}

</script>

<style lang="scss" scoped>

label {
  display: flex;
  flex-flow: column;
  margin: 1rem;

  &.error {
    color: var(--error-shade);
  }
}

span {
  text-align: start;
}

@mixin purple-border {
  border: {
    style: solid;
    color: var(--bright-purple);
    radius: 0.4rem;
  };
}

input {
  @include purple-border;
  text-align: center;
  font-size: 13pt;

  &:focus {
    outline: none;
  }
}

button {
  @include purple-border;
  font-size: large;
  font-family: "Fira Code", sans-serif;
  background-color: var(--main-purple);
  color: ghostwhite;
}

@media only screen and (min-width: 700px) {

  form {
    max-width: 400px;
    align-self: center;
  }

}
</style>