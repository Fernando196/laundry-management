<script setup lang="ts">
  import type { IOrder } from '~/types/order.type'
  import InputWrapper from '../common/InputWrapper.vue'
  import CustomModal from '../common/Modal/CustomModal.vue'
  import { ORDER_ESTATUS_TYPE } from '~/const/orders.const'
  import DropdownLabel from '../common/Dropdown/DropdownLabel.vue'

  const order = ref<IOrder>({
    status: ORDER_ESTATUS_TYPE.PEDING,
    customerName: '',
    amount: 0,
  })

  const optionsDrowpdown = Object.values(ORDER_ESTATUS_TYPE).map((status, index) => ({
    id: index,
    label: status,
  }))
</script>

<template>
  <CustomModal title="Crear nueva orden">
    <div class="grid h-125 w-125 grid-cols-12 gap-4 p-5">
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
      <DropdownLabel />
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <button class="rounded-sm bg-gray-300 px-3 py-1 text-gray-600">Cancelar</button>
        <button class="bg-primary rounded-sm px-3 py-1 text-white">Crear</button>
      </div>
    </template>
  </CustomModal>
</template>
