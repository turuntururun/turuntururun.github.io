<script setup lang="ts">
import { parseMarkdown } from 'comark'
import { MarkdownDocument } from '@comark/vue'

const props = defineProps<{
  filePath: string
}>()

const glob = import.meta.glob('../**/*.md', {
  import: 'default',
  query: '?raw',
})

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
  <MarkdownDocument :value="document" />
</template>

<style scoped></style>
