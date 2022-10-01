<template>
  <div>
    <nuxt-content :document="{ body: page.body }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { FetchReturn } from '@nuxt/content/types/query-builder'

export default Vue.extend({
  name: 'PrivacyPolicy',
  async asyncData(ctx: Context): Promise<object> {
    // todo get user language and load english policy if needed
    const page = await ctx.$content('politica-de-privacidad').fetch()
    return { page }
  },
  data() {
    return {
      page: {} as FetchReturn,
    }
  },
  head() {
    return {
      title: this.$data.page.title,
      meta: [
        {
          name: 'description',
          content: this.$data.page.description,
        },
      ],
    }
  },
})
</script>

<style scoped></style>
