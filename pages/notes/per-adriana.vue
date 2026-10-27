<script setup lang="ts">
useHead({
  title: 'Notas para Adriana',
  meta: [{ name: 'description', content: 'Notas para compartir a Adriana' }],
})
</script>

<template>
  <article>
    <MarkdownContent file-path="/content/adriana.md" />
  </article>
</template>
