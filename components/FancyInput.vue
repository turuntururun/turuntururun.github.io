<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Type something...',
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'clear'])

// Show clear button only when there is input and the field is not disabled
const showClear = computed(() => {
  return !props.disabled && String(props.modelValue ?? '').length > 0
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const clearInput = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div class="clearable-input-wrapper" :class="{ 'is-disabled': disabled }">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input-field"
      @input="handleInput"
    />

    <button
      v-if="showClear"
      type="button"
      class="clear-btn"
      aria-label="Clear input"
      @click="clearInput"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.clearable-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  max-width: 320px;
}

/* fixme I dont' like that it doesn't span its whole container*/
.input-field {
  width: 100%;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  font-size: 0.95rem;
  color: #1f2937;
  background-color: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.input-field:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}

.clear-btn {
  position: absolute;
  right: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  color: #9ca3af;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition:
    color 0.15s,
    background-color 0.15s;
}

.clear-btn:hover {
  color: #4b5563;
  background-color: #f3f4f6;
}

.clear-btn:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 1px;
}
</style>
