<script setup lang="ts">
  import { computed } from 'vue'
  import { useDarkMode } from '@/utils/composables/darkMode'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
  })
  const emit = defineEmits(['update:modelValue'])

  const { isDarkMode } = useDarkMode()

  const open = computed({
    get() {
      return props.modelValue
    },
    set(newValue) {
      emit('update:modelValue', newValue)
    }
  })
</script>

<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-300 transform "
      enter-from-class="opacity-0 translate-y-10 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
    >
      <div v-if="open" class="fixed flex items-center justify-center w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50" :class="isDarkMode ? 'dark' : ''">
        <slot></slot>
      </div>
    </transition>
  </Teleport>
</template>
