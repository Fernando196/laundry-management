<script setup lang="ts">
  import type { IOrder } from '~/types/order.type'
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import OrderFormModal from '../orders/OrderFormModal.vue'

  const { open: openModal } = useModal()
  const handleAddOrder = async () => {
    await openModal<IOrder>(OrderFormModal)
  }
</script>

<template>
  <div
    class="flex h-10 items-center justify-between border-b border-b-gray-300 px-3 shadow-sm md:h-20 md:px-10"
  >
    <div>
      <h1 class="text-primary text-sm font-semibold md:text-2xl">Nombre de lavanderia</h1>
    </div>
    <div>
      <button
        class="bg-primary flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1 text-sm font-semibold text-white md:px-3 md:py-2"
        @click="handleAddOrder"
      >
        <MapIcon name="add" class="hidden h-6 w-6 stroke-white md:flex" />
        Nueva Orden
      </button>
    </div>
  </div>
</template>
