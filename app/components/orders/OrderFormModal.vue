<script setup lang="ts">
  import type { IOrder } from '~/types/order.type'
  import InputWrapper from '../common/InputWrapper.vue'
  import CustomModal from '../common/Modal/CustomModal.vue'
</script>

<template>
  <CustomModal title="Crear nueva orden">
    <div class="grid h-125 w-125 grid-cols-12 flex-col gap-4 p-5">
      <InputWrapper
        v-model="order.customerName"
        label="Nombre del cliente"
        type="text"
        class="col-span-12"
      />
      <InputWrapper
        v-model="order.service"
        label="Tipo de servicio"
        type="text"
        class="col-span-12"
      />
      <InputWrapper
        v-model="order.amount"
        label="Total a cobrar"
        type="number"
        class="col-span-12"
      />
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <button class="rounded-sm bg-gray-300 px-3 py-1 text-gray-600">Cancelar</button>
        <button class="bg-primary rounded-sm px-3 py-1 text-white">Crear</button>
      </div>
    </template>
  </CustomModal>
</template>
