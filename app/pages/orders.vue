<script setup lang="ts">
  import type { IOrder, IOrderStatusType } from '~/types/order.type'
  import OrderRow from '~/components/orders/OrderRow.vue'
  import OrderDetailPanel from '~/components/orders/OrderDetailPanel.vue'
  import Empty from '~/components/common/Empty.vue'
  import Search from '~/components/common/Search.vue'
  import OrderFilterTabs from '~/components/orders/OrderFilterTabs.vue'
  import { useOrderStore } from '~/store/orders.store'
  import { ORDER_STATUS_CATALOG } from '~/const/orders.const'
  import PageHeader from '~/components/ui/PageHeader.vue'

  definePageMeta({ title: 'Pedidos' })

  const orderStore = useOrderStore()
  const { orders } = storeToRefs(orderStore)
  const { pending } = await useAsyncData('orders', () => orderStore.fetchOrders())

  // ── Filters ────────────────────────────────────────────────────────────────
  type FilterTab = 'all' | IOrderStatusType

  const activeFilter = ref<FilterTab>('all')
  const search = ref('')

  const filteredOrders = computed(() => {
    let list = orders.value

    if (activeFilter.value !== 'all') {
      list = list.filter((o) => o.status === activeFilter.value)
    }

    const q = search.value.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (o) => o.customerName.toLowerCase().includes(q) || String(o.id).includes(q)
      )
    }
    // Most recent first
    return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  })

  // ── Selection ──────────────────────────────────────────────────────────────
  const selectedOrder = ref<IOrder | null>(null)

  function selectOrder(order: IOrder) {
    selectedOrder.value = order
  }

  // Auto-select first when filter changes
  watch(
    filteredOrders,
    (list) => {
      if (!list.find((o) => o.id === selectedOrder.value?.id)) {
        selectedOrder.value = list[0] ?? null
      }
    },
    { immediate: true }
  )

  // ── Actions ────────────────────────────────────────────────────────────────
  function handleChangeStatus(order: IOrder, newStatus: IOrderStatusType) {
    if (!selectedOrder.value) return
    order.status = newStatus
    order.Status = ORDER_STATUS_CATALOG[newStatus]
    orderStore.updatedOrder(selectedOrder.value.id!, {
      ...selectedOrder.value,
      status: newStatus,
    })
  }
</script>

<template>
  <div class="grid h-full w-full grid-cols-[1fr_auto] overflow-hidden">
    <div class="flex flex-col overflow-auto">
      <!-- Header -->
      <PageHeader
        title="Pedidos"
        :subtitle="`${orders.length} pedidos totales - ${filteredOrders.length} mostrados`"
      >
        <template #right>
          <Search id="orders-search" v-model="search" placeholder="Buscor por cliente o # pedido" />
        </template>
        <template #bottom>
          <OrderFilterTabs v-model="activeFilter" :orders="orders" />
        </template>
      </PageHeader>

      <!-- Orders list -->
      <div class="flex-1 overflow-auto">
        <div
          v-if="filteredOrders.length"
          class="grid h-full w-full grid-cols-12 content-start gap-4 p-4"
        >
          <OrderRow
            v-for="order in filteredOrders"
            :key="order.id"
            class="col-span-12 lg:col-span-6 xl:col-span-4"
            :order="order"
            :selected="selectedOrder?.id === order.id"
            @select="selectOrder"
          />
        </div>
        <Empty v-else message="Sin registros" icon-class="w-12 h-12" icon="close" />
      </div>
    </div>

    <div class="hidden overflow-hidden p-8 sm:flex sm:w-80 xl:w-120">
      <OrderDetailPanel
        v-if="selectedOrder"
        :order="selectedOrder"
        @on-change-status="handleChangeStatus"
      />

      <!-- Empty state -->
      <div v-else class="flex flex-1">
        <Empty message="Seleccione un pedido" icon-class="w-12 h-12" icon="file" />
      </div>
    </div>
  </div>
</template>
