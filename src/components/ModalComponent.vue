<script setup lang="ts">
  import { computed } from 'vue'
  import type { PropType } from 'vue'

  interface TodoItem {
    item: string
    id: number
  }

  const props = defineProps({
    isModalOpen: {
      type: Boolean,
      required: true
    },
  })
  const emit = defineEmits(['update:isModalOpen'])

  const open = computed({
    get() {
      return props.isModalOpen
    },
    set(newValue) {
      emit('update:isModalOpen', newValue)
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