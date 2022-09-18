<template>
  <div>
    <nuxt-content :document="{ body: page.body }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { FetchReturn } from "@nuxt/content/types/query-builder";

export default Vue.extend({
  name: 'IndexPage',
  async asyncData(ctx: Context): Promise<object> {
    const page = await ctx.$content('index').fetch()
    return { page }
  },
  data() {
    return {
      page: {} as FetchReturn,
    }
  },
  head() {
    return { title: this.$data.page.title }
  },
})
</script>

<style scoped></style>
