<template>
  <Teleport to="body">
    <div
      v-for="(modal, index) in modalStack"
      :key="index"
      class="fixed inset-0 flex items-center justify-center bg-black/50 p-4"
      :style="{ zIndex: 50 + index * 10 }"
      @click.self="handleBackdropClick(index)"
    >
      <component :is="modal.component" v-bind="modal.props" @close="close" />
    </div>
  </Teleport>
</template>
<script setup lang="ts">
  const { modalStack, close } = useModal()

  const handleBackdropClick = (index: number) => {
    // Solo permite cerrar el modal superior
    if (index === modalStack.value.length - 1) {
      // close();
    }
  }
</script>
