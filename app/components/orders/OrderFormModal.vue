<script setup lang="ts">
  import type { IOrder, OrderStatus, ServiceType } from '~/types/order.type'
  import InputWrapper from '../common/InputWrapper.vue'
  import CustomModal from '../common/Modal/CustomModal.vue'
  import {
    ORDER_STATUS_CATALOG,
    ORDER_STATUS_TYPE,
    ORDER_SERVICE_TYPE_CATALOG,
  } from '~/const/orders.const'
  import DropdownLabel from '../common/Dropdown/DropdownLabel.vue'
  import { useOrderStore } from '~/store/orders.store'

  interface Props {
    order?: IOrder
    isEdit?: boolean
  }

  const props = defineProps<Props>()
  const { close } = useModal()
  const orderStore = useOrderStore()

  const order = ref<IOrder>({
    status: props.order?.status ?? ORDER_STATUS_TYPE.PENDING,
    customerName: props.order?.customerName ?? '',
    amount: props.order?.amount ?? 0,
    service: props.order?.service ?? undefined,
    comments: props.order?.comments ?? '',
    createdAt: props.order?.createdAt ?? new Date().toString(),
  })

  const optionsServiceType = (Object.keys(ORDER_SERVICE_TYPE_CATALOG) as ServiceType[]).map(
    (service) => ({
      id: service,
      label: ORDER_SERVICE_TYPE_CATALOG[service].label,
    })
  )
  const optionsOrderEstatus = (Object.keys(ORDER_STATUS_CATALOG) as OrderStatus[]).map(
    (status) => ({
      id: status,
      label: ORDER_STATUS_CATALOG[status].label,
    })
  )

  const handleChangeService = (service: string | number | null) => {
    if (!service) return
    order.value.amount = ORDER_SERVICE_TYPE_CATALOG[service as ServiceType].serviceCost
  }

  const onSave = () => {
    if (props.isEdit) {
      orderStore.updateOrder(order.value)
    } else {
      orderStore.addOrder(order.value)
    }
    close(order.value)
  }
</script>

<template>
  <CustomModal title="Crear nueva orden">
    <div class="grid h-max w-125 grid-cols-12 content-start gap-4 p-5">
      <InputWrapper
        v-model="order.customerName"
        label="Nombre del cliente"
        type="text"
        class="col-span-12"
      />
      <DropdownLabel
        class="col-span-12"
        :options="optionsOrderEstatus"
        label="Seleccione el estado de la orden"
        :disabled="false"
        placeholder="Seleccione el estado de la orden"
        v-model="order.status"
      />
      <DropdownLabel
        class="col-span-12"
        :options="optionsServiceType"
        label="Seleccione el tipo de servicio"
        :disabled="false"
        placeholder="Seleccione el tipo de servicio"
        v-model="order.service"
        @update:model-value="handleChangeService"
      />
      <InputWrapper
        v-model="order.amount"
        label="Total a cobrar"
        type="number"
        class="col-span-12"
      />
      <InputWrapper
        v-model="order.comments"
        label="Comentarios adicionales"
        type="text"
        class="col-span-12"
        :rows="4"
        :is-text-area="true"
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
        <button @click="onSave" class="bg-primary cursor-pointer rounded-sm px-3 py-1 text-white">
          Crear
        </button>
      </div>
    </template>
  </CustomModal>
</template>
