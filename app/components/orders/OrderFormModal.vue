<script setup lang="ts">
  import type {
    IOrder,
    IOrderStatusType,
    IOrderServiceType,
    IOrderProduct,
  } from '~/types/order.type'
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
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import ProductListForm from './OrderProductInput.vue'

  interface Props {
    order?: IOrder
  }

  const props = defineProps<Props>()
  const { close } = useModal()
  const orderStore = useOrderStore()
  const products = ref<IOrderProduct[]>(
    props.order?.OrderProducts ? [...props.order.OrderProducts] : []
  )

  const order = ref<IOrder>({
    id: props.order?.id || undefined,
    status: props.order?.status ?? ORDER_STATUS_TYPE.PENDING,
    customerName: props.order?.customerName ?? '',
    amount: props.order?.amount ?? 0,
    service: props.order?.service ?? ORDER_SERVICE_TYPE.WASH,
    comments: props.order?.comments ?? '',
    createdAt: props.order?.createdAt ?? new Date().toString(),
    receivedAt: props.order?.receivedAt ?? new Date().toString(),
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

  const addProduct = () => {
    products.value = [
      ...products.value,
      {
        productId: 0,
        quantity: 1,
        totalPrice: 0,
      },
    ]
  }
  const updateProduct = (id: number, product: IOrderProduct) => {
    products.value[id] = product
  }
  const removeProduct = (id: number) => {
    products.value.splice(id, 1)
  }

  const totalProductsPrice = computed(() => {
    return (
      products.value.reduce((acc, curr) => {
        return acc + (curr?.totalPrice || 0)
      }, 0) + ORDER_SERVICE_TYPE_CATALOG[order.value.service as IOrderServiceType]?.serviceCost
    )
  })

  const onSave = () => {
    order.value.OrderProducts = products.value
    if (props.order?.id) {
      orderStore.updatedOrder(order.value.id!, order.value)
    } else {
      orderStore.addOrder(order.value)
    }
    close(order.value)
  }

  const formattedReceivedAt = computed(() => {
    return order.value.receivedAt ? new Date(order.value.receivedAt).toISOString().slice(0, 16) : ''
  })
</script>

<template>
  <CustomModal title="Crear nuevo pedido">
    <div class="grid h-max w-full grid-cols-12 content-start gap-4 pb-10 md:w-150">
      <InputWrapper
        id="order-form-modal-customerName"
        v-model="order.customerName"
        label="Nombre del cliente"
        type="text"
        class="col-span-12 md:col-span-6"
      />
      <DropdownLabel
        id="order-form-modal-status"
        v-model="order.status"
        class="col-span-12 md:col-span-6"
        :options="optionsOrderEstatus"
        label="Seleccione el estado de la orden"
        :disabled="false"
        placeholder="Seleccione el estado de la orden"
      />
      <DropdownLabel
        id="order-form-modal-service"
        v-model="order.service"
        class="col-span-12 md:col-span-6"
        :options="optionsServiceType"
        label="Seleccione el tipo de servicio"
        :disabled="false"
        placeholder="Seleccione el tipo de servicio"
        @update:model-value="handleChangeService"
      />
      <InputWrapper
        id="order-form-modal-receivedAt"
        v-model="formattedReceivedAt"
        label="Fecha de recepción"
        type="datetime-local"
        class="col-span-12 md:col-span-6"
      />
      <section class="col-span-12 flex flex-col items-start gap-2">
        <div class="flex w-full justify-between">
          <span class="label-input-muted">Aditamientos</span>
          <button class="btn btn-sm" @click="addProduct">
            <MapIcon name="add" class="ico" />
            Agregar
          </button>
        </div>
        <div v-if="!products.length" class="label-input-muted text-text-subtle!">
          Producto añadidos (jabón, suavizante, etc.) se suman al total
        </div>
        <ProductListForm
          v-for="(product, index) in products"
          v-else
          :id="index"
          :key="index"
          v-model="products[index]!"
          @remove="removeProduct(index)"
          @update:model-value="updateProduct(index, $event)"
        />
      </section>

      <InputWrapper
        id="order-form-modal-comments"
        v-model="order.comments"
        label="Comentarios adicionales"
        type="text"
        class="col-span-12"
        :rows="3"
        :is-text-area="true"
        placeholder="Observaciones, preferencias, alergias, etc."
      />
      <div
        class="bg-primary-light border-primary text-primary col-span-12 flex w-full items-center justify-between rounded-md border px-3 py-2"
      >
        <p class="font-medium">Total a cobrar</p>
        <p class="font-mono text-xl font-semibold">${{ totalProductsPrice }} MXN</p>
      </div>
    </div>
    <template #footer>
      <div class="flex w-full justify-between gap-2">
        <div class="flex items-center">
          <span class="">Total calculado</span>
          <p class="ml-2 text-lg font-bold">${{ totalProductsPrice }}</p>
        </div>
        <div class="flex gap-2">
          <button class="btn" @click="close(false)">Cancelar</button>
          <button class="btn btn-primary" @click="onSave">
            {{ props.order?.id ? 'Actualizar' : 'Crear' }} pedido
          </button>
        </div>
      </div>
    </template>
  </CustomModal>
</template>
