<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

const apiUrl = 'https://project24-19f4587ef60f.herokuapp.com'

export default defineComponent({
  name: 'index',
  data() {
    return {
      places: {},
      state: '',
      district: '',
      race: 'PRESIDENCIA DE LA REPÚBLICA',
      candidates: {}
    }
  },
  async mounted() {
    const response = await axios.get(apiUrl + '/data-version')
    let version = response.data
    console.log('version read', version)
    if (version == localStorage.getItem('data-version')) {
      console.log('Trusting cache')
    } else {
      console.log('Clearing cache')
      localStorage.clear()
    }
    localStorage.setItem('data-version', version)
    this.places = await this.getFromCacheOrBackend('places', '/places')
    this.state = localStorage.getItem('state') || ''
    this.district = localStorage.getItem('district') || ''
    if (this.state && this.district) this.search()
  },
  methods: {
    search() {
      localStorage.setItem('state', this.state)
      localStorage.setItem('district', this.district)
      this.getFromCacheOrBackend(this.state + '/' + this.district, '/candidates/' + this.state + '/' + this.district)
        .then(o => {
          this.candidates = o
        })
    },
    async getFromCacheOrBackend(key: string, urlPath: string): Promise<object> {
      let storedPlaces = localStorage.getItem(key)
      if (storedPlaces) {
        return JSON.parse(storedPlaces)
      }
      const r = await axios.get(apiUrl + urlPath)
      localStorage.setItem(key, JSON.stringify(r.data))
      return r.data
    }
  },
  computed: {
    orderedCandidates() {
      return Object.groupBy(this.candidates[this.race], a => a.ticketNumber)
    },
    localSelected(): boolean {
      return [
        'BAJA CALIFORNIA SUR',
        'CHIAPAS',
        'CIUDAD DE MEXICO',
        'COAHUILA',
        'GUANAJUATO',
        'GUERRERO',
        'HIDALGO',
        'JALISCO',
        'MORELOS',
        'NUEVO LEÓN',
        'PUEBLA',
        'TABASCO',
        'VERACRUZ',
        'YUCATAN',
        'ZACATECAS'
      ].includes(this.state)
    }
  }
})
</script>

<template>
  <h1>Candidatos</h1>
  <section class="wrap-row">
    <label class="after-line">
      Entidad
      <select v-model="state">
        <option v-for="(_, n) in places" v-show="n != 'NACIONAL'">{{ n }}</option>
      </select>
    </label>
    <label class="after-line" v-show="state">
      Distrito
      <select v-model="district" @change="search">
        <option v-for="(p) in places[state]" v-show="p!='No aplica'">{{ p }}</option>
      </select>
    </label>
  </section>

  <section>
    <p v-if="localSelected">📝 Esta entidad también participará en elecciones locales.
      Los candidatos mostrados corresponden solo al proceso federal</p>
    <fieldset class="wrap-row">
      <legend>Contienda</legend>
      <label v-for="(_,r) in candidates">
        <input style="visibility: hidden" type="radio" :value="r" name="race" v-model="race">
        {{ r }}
      </label>
    </fieldset>
  </section>

  <section class="candidate-list">
    <section v-if="candidates[race]" v-for="persons in orderedCandidates"
             class="ticket-holder" :data-party="persons[0].party">
      <h3>{{ persons[0].party }}</h3>
      <CandidateProfile :candidate="p" v-for="p in persons" />
    </section>

  </section>
</template>

<style lang="scss" scoped>

select {
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.2rem;
  font-weight: bold;
  font-size: medium;
}

.wrap-row {
  display: flex;
  flex-flow: row wrap;
}

label:has(input[type="radio"]) {
  padding: 0.6rem 2rem;
}

label:has(input[type="radio"]:checked) {
  color: ghostwhite;
  background: rgba(78, 41, 92, 0.81);
}

.ticket-holder {
  border: 1px solid #4e295c;
  margin: 0.2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));

  h3 {
    grid-column: 1/-1;
    place-self: center;
  }

  * {
    margin: 1rem;
  }

}

button {
  place-self: center;
  color: ghostwhite;
  background: rgba(78, 41, 92, 0.81);
  padding: 0.5rem 1.2rem;
  font-size: 12pt;
  border: none;
  border-radius: 0.4rem;
}

button[disabled] {
  background: rgba(78, 41, 92, 0.50);
  cursor: not-allowed;
}

select {
  margin-right: 1.5rem;
  margin-left: 0.5rem;
}

.after-line {
  margin-bottom: 1.5rem;
}

.candidate-list {
  display: flex;
  flex-flow: column;
}

section[data-party="CANDIDATURA INDEPENDIENTE"] {
  order: 1;
}

section[data-party="FUERZA Y CORAZON POR MEXICO"] {
  order: 2;
}

section[data-party="MORENA"] {
  order: 3;
}

section[data-party="MOVIMIENTO CIUDADANO"] {
  order: 4;
}

section[data-party="PARTIDO ACCIÓN NACIONAL"] {
  order: 5;
}

section[data-party="PARTIDO DE LA REVOLUCIÓN DEMOCRÁTICA"] {
  order: 6;
}

section[data-party="PARTIDO DEL TRABAJO"] {
  order: 7;
}

section[data-party="PARTIDO REVOLUCIONARIO INSTITUCIONAL"] {
  order: 8;
}

section[data-party="PARTIDO VERDE ECOLOGISTA DE MÉXICO"] {
  order: 9;
}

section[data-party="SIGAMOS HACIENDO HISTORIA"] {
  order: 10;
}


</style>
