<script setup lang="ts">
  import type { IOrder, IOrderStatusType, IOrderServiceType } from '~/types/order.type'
  import InputWrapper from '../common/InputWrapper.vue'
  import CustomModal from '../common/Modal/CustomModal.vue'
  import {
    ORDER_STATUS_CATALOG,
    ORDER_STATUS_TYPE,
    ORDER_SERVICE_TYPE_CATALOG,
    ORDER_SERVICE_TYPE,
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
    service: props.order?.service ?? ORDER_SERVICE_TYPE.WASH,
    comments: props.order?.comments ?? '',
    createdAt: props.order?.createdAt ?? new Date().toString(),
  })

  const optionsServiceType = (Object.keys(ORDER_SERVICE_TYPE_CATALOG) as IOrderServiceType[]).map(
    (service) => ({
      id: service,
      label:
        ORDER_SERVICE_TYPE_CATALOG[service].label +
        ' — $' +
        ORDER_SERVICE_TYPE_CATALOG[service].serviceCost +
        ' MXN',
    })
  )
  const optionsOrderEstatus = (Object.keys(ORDER_STATUS_CATALOG) as IOrderStatusType[]).map(
    (status) => ({
      id: status,
      label: ORDER_STATUS_CATALOG[status].label,
    })
  )

  const handleChangeService = (service: string | number | null) => {
    if (!service) return
    order.value.amount = ORDER_SERVICE_TYPE_CATALOG[service as IOrderServiceType].serviceCost
  }

  const onSave = () => {
    if (props.isEdit) {
      orderStore.updatedOrder(order.value.id!, order.value)
    } else {
      orderStore.addOrder(order.value)
    }
    close(order.value)
  }
</script>

<template>
  <CustomModal title="Crear nueva orden">
    <div class="grid h-max w-full grid-cols-12 content-start gap-4 md:w-150">
      <InputWrapper
        v-model="order.customerName"
        label="Nombre del cliente"
        type="text"
        class="col-span-12 md:col-span-6"
      />
      <DropdownLabel
        v-model="order.status"
        class="col-span-12 md:col-span-6"
        :options="optionsOrderEstatus"
        label="Seleccione el estado de la orden"
        :disabled="false"
        placeholder="Seleccione el estado de la orden"
      />
      <DropdownLabel
        v-model="order.service"
        class="col-span-12 md:col-span-6"
        :options="optionsServiceType"
        label="Seleccione el tipo de servicio"
        :disabled="false"
        placeholder="Seleccione el tipo de servicio"
        @update:model-value="handleChangeService"
      />
      <div class="col-span-12 md:col-span-6">
        <InputWrapper v-model="order.quantity" label="Cantidad" type="number" />
        <span class="text-subtle text-xs"
          >Base: ${{
            ORDER_SERVICE_TYPE_CATALOG[order.service as IOrderServiceType]?.serviceCost || 0
          }}
          x {{ order.quantity || 0 }} = ${{
            (ORDER_SERVICE_TYPE_CATALOG[order.service as IOrderServiceType]?.serviceCost || 0) *
            (order.quantity || 0)
          }}</span
        >
      </div>
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
      <div class="flex w-full justify-between gap-2">
        <div class="flex items-center">
          <span class="">Total calculado</span>
          <p class="ml-2 text-lg font-bold">
            ${{
              (ORDER_SERVICE_TYPE_CATALOG[order.service as IOrderServiceType]?.serviceCost || 0) *
              (order.quantity || 0)
            }}
          </p>
        </div>
        <div class="flex gap-2">
          <button class="btn" @click="close(false)">Cancelar</button>
          <button class="btn btn-primary" @click="onSave">Crear pedido</button>
        </div>
      </div>
    </template>
  </CustomModal>
</template>
