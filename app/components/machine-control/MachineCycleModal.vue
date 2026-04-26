<script setup lang="ts">
  import { useOrderStore } from '~/store/orders.store'
  import DropdownLabel from '../common/Dropdown/DropdownLabel.vue'
  import CustomModal from '../common/Modal/CustomModal.vue'
  import { ORDER_STATUS_TYPE } from '~/const/orders.const'
  import MapIcon from '../common/MapIcon/MapIcon.vue'
  import type { IMachine } from '~/types/machine.type'

  interface Props {
    machine: IMachine
  }
  defineProps<Props>()
  const orderSelected = ref<number>(0)
  const { close } = useModal()
  const orderStore = useOrderStore()
  await useAsyncData('orders', () => orderStore.fetchOrders())
  const orders = computed(() => orderStore.orders)

  const ordersPending = computed(() =>
    orders.value
      .filter((order) => order.status === ORDER_STATUS_TYPE.PENDING)
      .map((order) => ({
        id: order.id!,
        label: `ORD-${order.id} - ${order.customerName} - ${order.amount} MXN`,
      }))
  )

  const onSave = () => {
    close(orderSelected.value)
  }
</script>
<template>
  <CustomModal :title="'Iniciar ciclo - ' + machine.name">
    <div class="grid h-max w-125 content-start pb-10">
      <DropdownLabel
        id="machine-cycle-modal-drop-select"
        v-model="orderSelected"
        label="Asociar pedido (opcional)"
        :options="ordersPending"
      />
      <div class="text-subtle mt-1 text-[12px] font-medium">
        {{ ordersPending.length }} pedido(s) pendiente(s) disponibles
      </div>
      <div
        class="text-muted bg-subtle-bg border-border mt-3 flex flex-col rounded-lg border px-2 py-3"
      >
        <div class="">
          <strong>Maquina:</strong>
          {{ machine.brand }} {{ machine.model }} - {{ machine.capacityKg }} kg
        </div>
        <div>
          <strong>Ubicación:</strong>
          {{ machine.location }}
        </div>
        <div>
          <strong>Duración:</strong>
          {{ machine.cycleDuration || 0 }} minutos
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex w-full justify-between gap-2">
        <div class="text-muted flex items-center">
          <span class="">La máquina pasará a "En uso" </span>
        </div>
        <div class="flex gap-2">
          <button class="btn" @click="close(false)">Cancelar</button>
          <button class="btn btn-primary" @click="onSave">
            <MapIcon name="play" class="ico fill-current" />
            Iniciar ciclo
          </button>
        </div>
      </div>
    </template>
  </CustomModal>
</template>
