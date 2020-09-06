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
      username: 'sdfa@asdf.sdaf',
      password: 'sdfsdf',
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

<style scoped>

label {
  display: flex;
  flex-flow: column;
  margin: 1rem;
}

label.error {
  color: var(--error-shade);
}

span {
  text-align: start;
}

input {
  text-align: center;
  font-size: 13pt;
  border-style: solid;
  border-color: var(--bright-purple);
  border-radius: 0.4rem;
}

input:focus {
  outline: none;
}

button {
  font-size: large;
  font-family: "Fira Code", sans-serif;
  background-color: var(--main-purple);
  color: ghostwhite;
  border-color: var(--bright-purple);
  border-style: solid;
  border-radius: 0.42rem;
}

@media only screen and (min-width: 700px) {

  form {
    max-width: 400px;
    align-self: center;
  }

}
</style>