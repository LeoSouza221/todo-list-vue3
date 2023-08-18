<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false,
    }
  })
  const emit = defineEmits(['update:modelValue'])

  const inputValue = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emit('update:modelValue', newValue)
    }
  })
</script>

<template>
  <div class="block w-full">
    <input
      class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
      type="text"
      v-model="inputValue"
      :placeholder="placeholder"
    >
    <div class="h-6">
      <span v-show="error" class="text-red-500 text-[0.75rem]">{{ errorMessage }}</span>
    </div>
  </div>
</template>