<script setup lang="ts">
  import { orders as ordersData } from '~/data/orders.data'
  import type { IOrder, OrderStatus } from '~/types/order.type'
  import OrderRow from '~/components/orders/OrderRow.vue'
  import OrderDetailPanel from '~/components/orders/OrderDetailPanel.vue'
  import Empty from '~/components/common/Empty.vue'

  definePageMeta({ title: 'Pedidos' })

  const orders = useState('orders', () => ordersData)

  // ── Filters ────────────────────────────────────────────────────────────────
  type FilterTab = 'all' | OrderStatus

  const activeFilter = ref<FilterTab>('all')
  const search = ref('')

  const filterTabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'pending', label: 'Pendiente' },
    { key: 'in-process', label: 'En proceso' },
    { key: 'ready', label: 'Listo' },
    { key: 'cancelled', label: 'Cancelado' },
  ]

  const filterTabClass: Record<FilterTab, string> = {
    all: 'bg-neutral-900 text-white',
    pending: 'bg-status-pendiente-bg text-status-pendiente',
    'in-process': 'bg-status-proceso-bg text-status-proceso',
    ready: 'bg-status-listo-bg text-status-listo',
    cancelled: 'bg-status-cancelado-bg text-status-cancelado',
  }

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

  function countByStatus(status: OrderStatus) {
    return orders.value.filter((o) => o.status === status).length
  }

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
  function advance(order: IOrder) {
    order.status = order.status === 'pending' ? 'in-process' : 'ready'
  }

  function collect(order: IOrder) {
    order.status = 'ready'
    order.completedAt = new Date().toISOString()
    // In a real app: open payment modal here
    selectedOrder.value = null
  }

  function cancel(order: IOrder) {
    order.status = 'cancelled'
  }
</script>

<template>
  <div class="bg-primary-light grid h-full w-full grid-cols-[1fr_auto] overflow-hidden">
    <div class="flex flex-col overflow-auto">
      <!-- Header -->
      <div class="border-b border-neutral-100 bg-white px-5 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-bold text-neutral-900">Pedidos</h1>
          <span class="text-sm text-neutral-400"
            >{{ filteredOrders.length }} resultado{{ filteredOrders.length !== 1 ? 's' : '' }}</span
          >
        </div>

        <!-- Search -->
        <div class="relative mt-3">
          <svg
            class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Buscar por cliente o # pedido…"
            class="focus:border-primary w-full rounded-xl border border-neutral-100 bg-neutral-50 py-2 pr-4 pl-9 text-sm text-neutral-900 transition-colors outline-none placeholder:text-neutral-400 focus:bg-white"
          />
        </div>

        <!-- Filter tabs -->
        <div class="mt-3 flex gap-2 overflow-x-auto pb-0.5">
          <button
            v-for="tab in filterTabs"
            :key="tab.key"
            class="shrink-0 cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-colors"
            :class="
              activeFilter === tab.key
                ? filterTabClass[tab.key]
                : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'
            "
            @click="activeFilter = tab.key"
          >
            {{ tab.label }}
            <span v-if="tab.key !== 'all'" class="ml-1 opacity-70">
              {{ countByStatus(tab.key as OrderStatus) }}
            </span>
          </button>
        </div>
      </div>

      <!-- Orders list -->
      <div class="flex-1 overflow-auto">
        <template v-if="filteredOrders.length">
          <div class="grid h-full w-full grid-cols-12 gap-4 p-4">
            <OrderRow
              v-for="order in filteredOrders"
              :key="order.id"
              class="col-span-12 md:col-span-6 lg:col-span-4"
              :order="order"
              :selected="selectedOrder?.id === order.id"
              @select="selectOrder"
            />
          </div>
        </template>
        <div v-else class="flex flex-col items-center justify-center gap-2 py-20 text-neutral-400">
          <Empty message="Sin registros" icon-class="w-12 h-12" icon="close" />
        </div>
      </div>
    </div>

    <div class="flex w-112.5 flex-col">
      <OrderDetailPanel
        v-if="selectedOrder"
        :order="selectedOrder"
        @advance="advance"
        @collect="collect"
        @cancel="cancel"
      />

      <!-- Empty state -->
      <div v-else class="flex flex-1">
        <Empty message="Seleccione un pedido" icon-class="w-12 h-12" icon="file" />
      </div>
    </div>
  </div>
</template>
