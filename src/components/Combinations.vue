<template>

  <div class="combination" @submit.prevent="calcSolutions">
    <form>
      <button class="button" @click="clear">Limpiar</button>

      <form class="data-input">
        <label>
          Suma
          <input v-model="sum" type="number">
        </label>

        <label>
          Elementos
          <input v-model="elements" type="number">
        </label>
      </form>
      <label>Números permitidos</label>
      <div class="data-input">
        <button v-for="n in [1,2,3,4,5,6,7,8,9]" :key="n"
                :class="{'is-primary':numbers.includes(n), 'is-outlined':!numbers.includes(n)}" class="button"
                @click="toggleNumber(n)">{{ n }}
        </button>
      </div>

      <button class="button is-primary" type="submit" @click.prevent="calcSolutions">Calcular</button>
    </form>
    <div v-show="dirty && !solutions.length" class="error">No hay soluciones</div>
    <p v-for="sol in solutions" :key="sol.id">{{ sol }}</p>

  </div>

</template>

<script>

export default {
  name: 'Combinations',
  data() {
    return {
      sum: '',
      elements: '',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      solutions: [],
      dirty: false
    }
  },
  methods: {
    clear() {
      this.sum = '';
      this.elements = '';
      this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.solutions = [];
      this.dirty = false;
    },
    calcSolutions() {
      this.dirty = true;
      this.solutions = this.k_combinations(this.numbers, this.elements)
          .filter(a => a.reduce((e1, e2) => e1 + e2, 0) + '' === this.sum);
    },
    toggleNumber(n) {
      if (this.numbers.includes(n)) {
        const index = this.numbers.indexOf(n);
        this.numbers.splice(index, 1);
      } else {
        this.numbers.push(n);
      }
    },
    /**
     * Gracias a https://gist.github.com/axelpale/3118596
     */
    k_combinations(set, k) {
      var i, j, combs, head, tailcombs;

      if (k > set.length || k <= 0) {
        return [];
      }

      if (k === set.length) {
        return [set];
      }

      if (k === 1) {
        combs = [];
        for (i = 0; i < set.length; i++) {
          combs.push([set[i]]);
        }
        return combs;
      }
      combs = [];
      for (i = 0; i < set.length - k + 1; i++) {
        head = set.slice(i, i + 1);

        tailcombs = this.k_combinations(set.slice(i + 1), k - 1);

        for (j = 0; j < tailcombs.length; j++) {
          combs.push(head.concat(tailcombs[j]));
        }
      }
      return combs;
    }
  }

}
</script>

<style lang="scss" scoped>

div {
  height: auto;
}

.combination {
  height: auto;
  padding: 1em;
}

.data-input {
  margin: 2em 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

input {
  text-align: center;
}

.error {
  margin: 2em auto;
  color: #bf0f0f;
}

</style>
