<template>
  <div>
    <nuxt-content :document="{ body: page.body }" />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'

export default {
  name: 'Post',
  async asyncData(ctx: Context): Promise<object> {
    const { category, post } = ctx.params
    const page = await ctx.$content(category + '/' + post).fetch()
    return { page }
  },
}
</script>

<style scoped></style>
