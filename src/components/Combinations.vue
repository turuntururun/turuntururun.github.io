<template>

  <div class="combination">
    <div class="columns">
      <div class="column">
        <div class="data-input">
          <form @submit.prevent="">

            <label>
              <p>Suma</p>
              <input id="sum-input" v-model="sum" maxlength="2" type="number" @input="jump">
            </label>

            <label>
              <p>Elementos</p>
              <input id="els-input" v-model="elements" maxlength="1" type="number">
            </label>
          </form>
        </div>
        <label class="middle-label">Números permitidos</label>
        <div class="data-input">
          <button v-for="n in [1,2,3,4,5,6,7,8,9]" :key="n"
                  :class="{'is-primary':numbers.includes(n), 'is-outlined':!numbers.includes(n)}" class="button"
                  @click="toggleNumber(n)">{{ n }}
          </button>
        </div>
      </div>
      <div class="column">
        <button class="button is-primary is-inverted" type="reset" @click="clear">Limpiar</button>
        <div v-show="dirty && !solutions.length" class="error">No hay soluciones</div>
        <p v-for="sol in solutions" :key="sol.id">{{ sol }}</p>
      </div>

    </div>


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
      dirty: false
    }
  },
  computed: {
    solutions() {
      if (!this.numbers || !this.elements) {
        return [];
      }
      return this.k_combinations(this.numbers, this.elements)
          .filter(a => a.reduce((e1, e2) => e1 + e2, 0) + '' === this.sum);
    }
  },
  methods: {
    clear() {
      this.sum = '';
      this.elements = '';
      this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this.dirty = false;
      document.getElementById("sum-input").focus();
    },
    jump(ev) {

      switch (ev.target.id) {
        case 'sum-input':
          if (ev.target.value.length === 2)
            document.getElementById("els-input").focus();
          return;
        case 'els-input':
          if (ev.target.value.length === 1)
            document.getElementById("els-input").blur();
      }
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

p {
  margin: 0.3rem
}

.column {
  flex-grow: 1;
  width: 50%;

  input {
    width: 70%;
    margin: 0 auto;
  }
}

.columns {
  display: flex;
  flex-flow: row nowrap
}

div {
  height: auto;
}

.combination {
  height: auto;
  padding: 1em;
}

.data-input {
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

.middle-label {
  margin: 0.8rem 0
}

.button.is-inverted {
  border: 1px solid var(--main-purple);
}

</style>
