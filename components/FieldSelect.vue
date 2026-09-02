<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    options: string[]
    modelValue: string | number
    title: string
    name?: string
    orientation?: 'column' | 'row'
  }>(),
  { title: '', name: crypto.randomUUID(), orientation: 'column' },
)

const emits = defineEmits(['update:modelValue'])

function selectedOption(event: Event) {
  const target = event.target as HTMLInputElement
  if (typeof props.modelValue === 'string') {
    emits('update:modelValue', target.value)
  } else {
    emits('update:modelValue', props.options.indexOf(target.value))
  }
}

function isSelected(m: string, i: number): boolean {
  return props.modelValue === m || props.modelValue === i
}
</script>

<template>
  <fieldset :class="props.orientation">
    <legend>{{ title }}</legend>
    <label
      v-for="(m, i) in props.options"
      :class="{ selected: isSelected(m, i) }"
    >
      <input type="radio" :value="m" name="radio" @input="selectedOption" />
      {{ m }}
    </label>
  </fieldset>
</template>

<style scoped>
fieldset.column {
  flex-flow: column nowrap;
  display: inline-flex;
}
fieldset.row {
  flex-flow: row wrap;
  display: flex;
}
</style>
