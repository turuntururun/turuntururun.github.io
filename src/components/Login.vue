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
  </form>

</template>

<script>
import shajs from 'sha.js'
import axios from 'axios'
import qs from 'querystring'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async requestLogin() {

      const headers = {
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization': "Basic " + window.btoa("turuntururun.com" + ':' + "123456")
      };

      const body = {
        grant_type: 'password',
        scope: 'read',
        username: this.username,
        password: this.hash(this.password)
      }

      axios.post("https://turuntururun-oauth2.herokuapp.com/oauth/token", qs.stringify(body), {headers})
          //TODO store token and do something with 4xx errors
          .then(value => console.log("Token response", value.data))
          .catch(reason => console.error(reason));


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