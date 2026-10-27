<script setup lang="ts">
import { parseMarkdown } from 'comark'
import { MarkdownDocument } from '@comark/vue'
import Spoiler from '~/components/Spoiler.vue'

const props = defineProps<{
  filePath: string
}>()

const glob = import.meta.glob('../**/*.md', {
  import: 'default',
  query: '?raw',
})

const components = { Spoiler }

let globElement = glob['../assets' + props.filePath]

if (!globElement) {
  throw new Error('File not found')
}

const text = await globElement()

const document = await parseMarkdown(text as string)

useHead({
  title: document.frontmatter.title,
  meta: [{ name: 'description', content: document.frontmatter.description }],
})
</script>

<template>
  <MarkdownDocument :value="document" :components="components" />
</template>

<style scoped>
/* todo add article specific styles */
</style>
