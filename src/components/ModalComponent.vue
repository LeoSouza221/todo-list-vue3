<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
  })
  const emit = defineEmits(['update:modelValue'])

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
    <div v-if="open" class="modal">
      <slot></slot>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
}
</style>