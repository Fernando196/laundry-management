<script setup lang="ts">
  import type { IOrder } from '~/types/order.type'
  import InputWrapper from '../common/InputWrapper.vue'
  import CustomModal from '../common/Modal/CustomModal.vue'
  import {
    ORDER_ESTATUS_CATALOG,
    ORDER_ESTATUS_TYPE,
    SERVICE_TYPE,
    SERVICE_TYPE_CATALOG,
  } from '~/const/orders.const'
  import DropdownLabel from '../common/Dropdown/DropdownLabel.vue'

  const { close } = useModal()

  const order = ref<IOrder>({
    status: ORDER_ESTATUS_TYPE.PEDING,
    customerName: '',
    amount: 0,
  })

  const optionsServiceType = Object.values(SERVICE_TYPE).map((service, index) => ({
    id: index,
    label: SERVICE_TYPE_CATALOG[service].label,
  }))
  const optionsOrderEstatus = Object.values(ORDER_ESTATUS_TYPE).map((status, index) => ({
    id: index,
    label: ORDER_ESTATUS_CATALOG[status].label,
  }))
</script>

<template>
  <CustomModal title="Crear nueva orden">
    <div class="grid h-110 w-125 grid-cols-12 content-start gap-4 p-5">
      <InputWrapper
        v-model="order.customerName"
        label="Nombre del cliente"
        type="text"
        class="col-span-12"
      />
      <InputWrapper
        v-model="order.amount"
        label="Total a cobrar"
        type="number"
        class="col-span-12"
      />
      <DropdownLabel
        class="col-span-12"
        :options="optionsServiceType"
        label="Seleccione el tipo de servicio"
        :disabled="false"
        placeholder="Seleccione el tipo de servicio"
      />
      <DropdownLabel
        class="col-span-12"
        :options="optionsOrderEstatus"
        label="Seleccione el estado de la orden"
        :disabled="false"
        placeholder="Seleccione el estado de la orden"
      />
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <button
          class="cursor-pointer rounded-sm bg-gray-300 px-3 py-1 text-gray-600"
          @click="close(false)"
        >
          Cancelar
        </button>
        <button class="bg-primary cursor-pointer rounded-sm px-3 py-1 text-white">Crear</button>
      </div>
    </template>
  </CustomModal>
</template>
