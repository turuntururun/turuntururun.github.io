<template>
  <div class="candidate-container">
    <header v-if="['Persona Propietaria', 'TITULAR'].includes(candidate.type)">
      <h5 class="position-header">Titular</h5>
      <h3>{{ candidate.name }}</h3>
    </header>
    <header v-else>
      <h5 class="position-header">Suplente</h5>
      <h3>{{ candidate.name }}</h3>
    </header>
    <section class="candidate-data">
      <fieldset class="age">
        <legend>Edad</legend>
        <span>{{ candidate.age }}</span>
      </fieldset>
      <fieldset class="sex">
        <legend>Sexo</legend>
        <span>{{ candidate.sex }}</span>
      </fieldset>
      <fieldset class="education">
        <legend>Nivel de estudios</legend>
        <span>{{ candidate.education || 'No proporcionó' }}</span>
      </fieldset>
      <span class="break"></span>

      <fieldset class="socials">
        <legend>Redes sociales</legend>
        <span v-if="!candidate.socials.includes('https')">{{ candidate.socials }}</span>
        <span v-else v-for="s in candidate.socials.split(',')">
          <a :href="s.trim()" target="_blank">
        <svg v-if="s.includes('facebook.com')" class="logo" aria-labelledby="fb-app-logo" fill="none"
             viewBox="0 0 500 500"><title id="fb-app-logo">Facebook app logo</title><g><path fill="currentColor"
                                                                                             d="m500,250C500,111.93,388.07,0,250,0S0,111.93,0,250c0,117.24,80.72,215.62,189.61,242.64v-166.24h-51.55v-76.4h51.55v-32.92c0-85.09,38.51-124.53,122.05-124.53,15.84,0,43.17,3.11,54.35,6.21v69.25c-5.9-.62-16.15-.93-28.88-.93-40.99,0-56.83,15.53-56.83,55.9v27.02h81.66l-14.03,76.4h-67.63v171.77c123.77-14.95,219.7-120.35,219.7-248.17Z"></path><path
          fill="none"
          d="m347.92,326.4l14.03-76.4h-81.66v-27.02c0-40.37,15.84-55.9,56.83-55.9,12.73,0,22.98.31,28.88.93v-69.25c-11.18-3.11-38.51-6.21-54.35-6.21-83.54,0-122.05,39.44-122.05,124.53v32.92h-51.55v76.4h51.55v166.24c19.34,4.8,39.57,7.36,60.39,7.36,10.25,0,20.36-.63,30.29-1.83v-171.77h67.64Z"></path></g></svg>
        <svg v-else-if="s.includes('twitter.com')||s.includes('x.com')" viewBox="0 0 24 24" aria-hidden="true" class="logo"><g><path
          d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
        <img v-else-if="s.includes('instagram.com')" class="logo"
             src="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/tBxa1IFcTQH.png" alt="">
        <svg v-else-if="s.includes('tiktok.com')" xmlns="http://www.w3.org/2000/svg" width="30" height="42"
             fill="currentColor" alt="TikTok"><path fill="#25F4EE"
                                                    d="M9.875 16.842v-1.119A9 9 0 0 0 8.7 15.64c-4.797-.006-8.7 3.9-8.7 8.708a8.7 8.7 0 0 0 3.718 7.134A8.68 8.68 0 0 1 1.38 25.55c0-4.737 3.794-8.598 8.495-8.707"></path><path
          fill="#25F4EE"
          d="M10.086 29.526c2.14 0 3.89-1.707 3.967-3.83l.006-18.968h3.463a7 7 0 0 1-.11-1.202h-4.726l-.006 18.969a3.98 3.98 0 0 1-3.967 3.829 3.9 3.9 0 0 1-1.846-.46 3.95 3.95 0 0 0 3.22 1.662m13.905-16.36v-1.055a6.5 6.5 0 0 1-3.583-1.068 6.57 6.57 0 0 0 3.583 2.123"></path><path
          fill="#FE2C55"
          d="M20.409 11.044a6.54 6.54 0 0 1-1.616-4.316h-1.265a6.56 6.56 0 0 0 2.88 4.316M8.706 20.365a3.98 3.98 0 0 0-3.973 3.976c0 1.528.869 2.858 2.134 3.523a3.94 3.94 0 0 1-.754-2.321 3.98 3.98 0 0 1 3.973-3.976c.409 0 .805.07 1.175.185v-4.833a9 9 0 0 0-1.175-.083c-.07 0-.134.006-.204.006v3.708a4 4 0 0 0-1.176-.185"></path><path
          fill="#FE2C55"
          d="M23.992 13.166v3.676c-2.453 0-4.727-.786-6.58-2.116v9.622c0 4.8-3.902 8.713-8.706 8.713a8.67 8.67 0 0 1-4.988-1.579 8.7 8.7 0 0 0 6.368 2.781c4.797 0 8.707-3.906 8.707-8.714v-9.621a11.25 11.25 0 0 0 6.579 2.116v-4.73q-.72-.002-1.38-.148"></path><path
          fill="black"
          d="M17.413 24.348v-9.622a11.25 11.25 0 0 0 6.58 2.116v-3.676a6.57 6.57 0 0 1-3.584-2.123 6.6 6.6 0 0 1-2.888-4.315H14.06l-.006 18.968a3.98 3.98 0 0 1-3.967 3.83A3.99 3.99 0 0 1 6.86 27.87a3.99 3.99 0 0 1-2.133-3.523A3.98 3.98 0 0 1 8.7 20.372c.409 0 .805.07 1.175.185v-3.708c-4.701.103-8.495 3.964-8.495 8.701 0 2.29.888 4.373 2.338 5.933a8.67 8.67 0 0 0 4.988 1.58c4.798 0 8.707-3.913 8.707-8.714m12.635-11.17h14.775l-1.355 4.232h-3.832v15.644h-4.778V17.41l-4.804.006zm38.984 0h15.12l-1.355 4.232h-4.17v15.644h-4.785V17.41l-4.804.006zM45.73 19.502h4.733v13.553h-4.708zm6.617-6.374h4.733v9.257l4.689-4.61h5.646l-5.934 5.76 6.644 9.52h-5.213l-4.433-6.598-1.405 1.362v5.236H52.34V13.128zm50.143 0h4.734v9.257l4.688-4.61h5.647l-5.934 5.76 6.643 9.52h-5.206l-4.433-6.598-1.405 1.362v5.236h-4.734zm-54.397 4.826a2.384 2.384 0 0 0 2.382-2.384 2.384 2.384 0 1 0-2.382 2.384"></path><path
          fill="#25F4EE"
          d="M83.545 24.942a8.11 8.11 0 0 1 7.473-8.087 9 9 0 0 0-.709-.026c-4.478 0-8.106 3.631-8.106 8.113s3.628 8.113 8.106 8.113c.21 0 .498-.013.71-.026-4.178-.326-7.475-3.823-7.475-8.087"></path><path
          fill="#FE2C55"
          d="M92.858 16.83c-.217 0-.505.012-.716.025a8.11 8.11 0 0 1 7.468 8.087 8.11 8.11 0 0 1-7.468 8.087c.211.02.499.026.716.026 4.478 0 8.106-3.631 8.106-8.113s-3.628-8.113-8.106-8.113"></path><path
          fill="black"
          d="M91.58 28.887a3.94 3.94 0 0 1-3.94-3.945 3.94 3.94 0 1 1 7.882 0c0 2.18-1.77 3.945-3.942 3.945m0-12.058c-4.477 0-8.106 3.631-8.106 8.113s3.629 8.113 8.106 8.113 8.106-3.631 8.106-8.113-3.628-8.113-8.106-8.113"></path></svg>
        <svg v-else-if="s.includes('youtube.com')" class="logo" viewBox="0 0 170 110" xml:space="preserve"><g><g><path fill="#FF0000" d="M154.3,17.5c-1.8-6.7-7.1-12-13.8-13.8c-12.1-3.3-60.8-3.3-60.8-3.3S31,0.5,18.9,3.8    c-6.7,1.8-12,7.1-13.8,13.8C1.9,29.7,1.9,55,1.9,55s0,25.3,3.3,37.5c1.8,6.7,7.1,12,13.8,13.8c12.1,3.3,60.8,3.3,60.8,3.3    s48.7,0,60.8-3.3c6.7-1.8,12-7.1,13.8-13.8c3.3-12.1,3.3-37.5,3.3-37.5S157.6,29.7,154.3,17.5z"/><polygon
          fill="#FFFFFF" points="64.2,78.4 104.6,55 64.2,31.6   " /></g></g></svg>
        <span v-else>{{ s }}</span>
      </a>
        </span>
      </fieldset>

      <section class="button-collection">
        <button @click="showAboutMe = true">Sobre mí</button>
        <button @click="showProposals = true">Propuestas</button>
        <button @click="showContact = true">Datos de contacto</button>
        <a class="google-me" :href="googleUrl" target="_blank">Googléame</a>
      </section>

      <dialog :open="showAboutMe">
        <button class="close" @click="showAboutMe = false">X</button>
        <h2>{{ candidate.name }}</h2>
        <h3>Motivación política</h3>
        <p>{{ candidate.motivation || 'No proporcionó' }}</p>
        <h3>Trayectoria Política</h3>
        <p>{{ candidate.politics || 'No proporcionó' }}</p>
        <h3>Historia Profesional</h3>
        <p>{{ candidate.story || 'No proporcionó' }}</p>
        <h3>Historia Académica</h3>
        <p>{{ candidate.extraEducation || 'No proporcionó' }}</p>
      </dialog>

      <dialog :open="showProposals">
        <button class="close" @click="showProposals = false">X</button>
        <h2>{{ candidate.name }}</h2>
        <h3>PROPUESTA_1</h3>
        <p>{{ candidate.proposal1 || 'No proporcionó' }}</p>
        <h3>PROPUESTA_2</h3>
        <p>{{ candidate.proposal2 || 'No proporcionó' }}</p>
        <h3>PROPUESTA_GENERO</h3>
        <p>{{ candidate.proposal3 || 'No proporcionó' }}</p>
      </dialog>

      <dialog :open="showContact">
        <button class="close" @click="showContact = false">X</button>
        <h2>{{ candidate.name }}</h2>
        <h3>Correo electrónico</h3>
        <p>{{ candidate.email || 'No proporcionó' }}</p>
        <h3>Teléfono</h3>
        <p>{{ candidate.phone || 'No proporcionó' }}</p>
        <h3>Dirección de casa de campaña</h3>
        <p>{{ candidate.address || 'No proporcionó' }}</p>
      </dialog>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CandidateProfile',
  props: ['candidate'],
  computed: {
    googleUrl() {
      const query = encodeURIComponent(this.candidate.name + ' ' + this.candidate.party)
      return 'https://www.google.com/search?q=' + query + '&tbm=nws&tbs=qdr:m'
    }
  },
  data() {
    return {
      showAboutMe: false,
      showProposals: false,
      showContact: false
    }
  },
  watch: {
    showAboutMe(on) {
      if (on) {
        this.showProposals = false
        this.showContact = false
      }
    },
    showProposals(on) {
      if (on) {
        this.showAboutMe = false
        this.showContact = false
      }
    },
    showContact(on) {
      if (on) {
        this.showProposals = false
        this.showAboutMe = false
      }
    }
  }

}
</script>

<style scoped>

.logo {
  width: 2rem;
  padding: 1rem;
}

.candidate-container {
  display: flex;
  flex-flow: column;
}

.candidate-data {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
}

button, a.google-me {
  place-self: center;

  color: ghostwhite;
  background: rgba(78, 41, 92, 0.81);
  padding: 0.5rem 1.2rem;
  font-size: 14pt;
  border: none;
  border-radius: 0.4rem;
}

a.google-me{
  text-decoration: none;
font-weight: normal;
}

dialog[open] {
  display: flex;
  flex-flow: column;
}

button.close {
  align-self: flex-end;
}

.position-header {
  padding: 0.6rem 0;
  font-style: italic;
  font-size: medium;
}

.age, .sex {
  flex: 1;
}

.education {
  flex: 2;
}

.break {
  flex: 100%;
  height: 0;
}

.socials {
  display: flex;
  flex: 2;
  flex-flow: row wrap;
  align-items: center;
}

.button-collection {
  display: flex;
  flex: 2;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
</style>
