<script lang="ts">

export default defineNuxtComponent({
  name: 'ren-care',
  data() {
    // todo use query params or something for data security
    return {
      event: {
        type: '',
        date: 0,
        food: '',
        pee: false,
        poo: false,
        amount: '',
        ail: ''
      }
    }
  },
  // todo compute if data captured is ready to send to enable/disable button
  methods: {
    save() {
      this.event.date = new Date().getTime()
      console.log(this.event.type)
      console.log(this.event.date)
      // todo send to backend
    }
  }
})
</script>

<template>
  <section class="event-type">
    <label v-for="t in ['Comida', 'Vueltita', 'Malestar']">
      <input type="radio" :value="t" name="type" v-model="event.type">
      {{ t }}
    </label>
  </section>

  <section class="food-section" v-if="event.type === 'Comida'">
    <label>
      <input type="radio" value="Leche" name="food" v-model="event.food">
      Leche
    </label>
    <label>
      <input type="radio" value="Hidromix" name="food" v-model="event.food">
      Hidromix
    </label>
    <label class="amount" v-if="event.food">
      Fueron
      <input type="number" v-model="event.amount">
      {{ event.food == 'Leche' ? 'mL' : 'g' }}
    </label>
  </section>

  <section class="walk-section" v-if="event.type === 'Vueltita'">
    <label>
      ¿Orinó?
      <input type="checkbox" v-model="event.pee">
    </label>
    <label>
      ¿Obró?
      <input type="checkbox" v-model="event.poo">
    </label>
    <label v-if="event.poo">
      ¿Cuánto?
      <input type="number" v-model="event.amount">
      cm
    </label>
  </section>

  <section class="walk-section" v-if="event.type === 'Malestar'">
    <label v-for="t in ['Tosió', 'Vomitó']">
      <input type="radio" :value="t" name="type" v-model="event.ail">
      {{ t }}
    </label>
  </section>

  <button @click="save">Guardar</button>

</template>

<style scoped>

section {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

button {
  align-self: flex-end;
  margin: 1rem;
}

.event-type {
  margin: 0.7rem;
  font-size: 1.2rem;
}

.food-section {
  margin: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
}

.food-section > .amount {
grid-column: 1 / -1;
}

.food-section > .amount {
  flex-basis: 100%;
}

.walk-section {
  margin: 1rem;
  display: flex;
  flex-flow: column;
}
</style>
