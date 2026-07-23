<script lang="ts">
import { defineComponent } from 'vue'
import type { Recipe } from 'assets/data/sleep-recipes'
import { recipes, ingredientList } from 'assets/data/sleep-recipes'

export default defineComponent({
  name: 'sleep-recipes',
  data(): { dish: string, selectedIngredients: string[] } {
    return {
      dish: 'salads',
      selectedIngredients: []
    }
  },
  computed: {
    ingredientList: () => ingredientList,
    selectedRecipes(): Recipe[] {

      return recipes[this.dish]
        .filter(d => this.selectedIngredients.every(e => d.ingredients.map(({ name }) => name).includes(e)))
    }
  }
})
</script>

<template>

  <div class="wrapper">
    <section class="data">
      <form>

        <fieldset class="dish-type">
          <legend>Dish type</legend>

          <label>
            <input type="radio" v-model="dish" value="salads" />
            Salads
          </label>
          <label>
            <input type="radio" v-model="dish" value="curry" />
            Curry
          </label>
          <label>
            <input type="radio" v-model="dish" value="desserts" />
            Desserts & Drinks
          </label>
        </fieldset>

        <fieldset class="ingredient-list">
          <legend>Ingredients</legend>

          <label class="ingredient-option" v-for="(name) in ingredientList"
                 :class="{selected:selectedIngredients.includes(name)}">

            <img :style="{opacity: selectedIngredients.includes(name)?'0.3':'1'}"
                 :src="'https://www.serebii.net/pokemonsleep/ingredients/' + (name as string).replace(' ','').toLowerCase() +'.png'"
                 :alt="(name as string)">

            <input style="display: none" type="checkbox" :value="name"
                   v-model="selectedIngredients">
          </label>
        </fieldset>
      </form>

      <table v-if="selectedRecipes.length">
        <thead>
        <tr>
          <th scope="col">Recipe</th>
          <th scope="col">Ingredients</th>
          <th scope="col">Pot size</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="r in  selectedRecipes">
          <td>
            <img
              :src="r.picUrl"
              :alt="r.name"
            >
            <span>
        {{ r.name }}
        </span>
          </td>
          <td style="display: flex; flex-wrap: wrap">
        <span v-for="i in r.ingredients" style="margin: 0 0.5em">
            <img
              :src="'https://www.serebii.net/pokemonsleep/ingredients/' +i.name.replace(' ','').toLowerCase() +'.png'"
              :alt="i.name"
              height="28">
            × {{ i.number }}
        </span>
          </td>
          <td class="centered">{{ r.ingredients.map(a => a.number).reduce((a, b) => a + b, 0) }}</td>
        </tr>
        </tbody>
      </table>
      <table v-else>
        <thead>
        <tr>
          <th>
            No recipes found
          </th>
        </tr>
        </thead>
      </table>
    </section>

    <footer>
      Thanks to <a href="https://www.serebii.net/pokemonsleep/dishes.shtml">serebii.net</a> for the logos and the raw
      data
    </footer>
  </div>
</template>

<style scoped>

label.ingredient-option {
  margin: 0 0.7rem;
  position: relative;
  display: inline-block;
}

label.ingredient-option.selected::before {
  content: "✅";
  position: absolute;
  font-size: 20px;
  left: 5px;
}

img {
  height: 28px;
  margin: 0;
  vertical-align: middle;
}

form {
  margin: 1.3rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.ingredient-list {
  display: flex;
  flex-flow: row wrap;
}

.dish-type {
  display: flex;
  flex-flow: column nowrap;
}

table {
  margin: 0 auto;
}

.data {
  flex: 1;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

</style>
