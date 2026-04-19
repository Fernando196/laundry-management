<script setup lang="ts">
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import OrderFormModal from '../orders/OrderFormModal.vue'

  const { open: openModal } = useModal()
  const handleAddOrder = async () => {
    await openModal(OrderFormModal)
  }
</script>

<template>
  <div class="flex h-20 items-center justify-between border-b border-b-gray-300 px-10 shadow-sm">
    <div>
      <h1 class="text-primary text-2xl font-semibold">Nombre de lavanderia</h1>
    </div>
    <div>
      <button
        class="bg-primary flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-semibold text-white"
        @click="handleAddOrder"
      >
        <MapIcon name="add" class="h-6 w-6 stroke-white" />
        Nueva Orden
      </button>
    </div>
  </div>
</template>
