<script setup lang="ts">
import { orders as ordersData } from '~/data/orders.data'
import type { IOrder, OrderStatus } from '~/types/order.type'
import OrderRow from '~/components/orders/OrderRow.vue'
import OrderDetailPanel from '~/components/orders/OrderDetailPanel.vue'

definePageMeta({ title: 'Pedidos' })

const orders = useState('orders', () => ordersData)

// ── Filters ────────────────────────────────────────────────────────────────
type FilterTab = 'all' | OrderStatus

const activeFilter = ref<FilterTab>('all')
const search = ref('')

const filterTabs: { key: FilterTab; label: string }[] = [
  { key: 'all',        label: 'Todos' },
  { key: 'pending',    label: 'Pendiente' },
  { key: 'in-process', label: 'En proceso' },
  { key: 'ready',      label: 'Listo' },
  { key: 'cancelled',  label: 'Cancelado' },
]

const filterTabClass: Record<FilterTab, string> = {
  all:          'bg-neutral-900 text-white',
  pending:      'bg-status-pendiente-bg text-status-pendiente',
  'in-process': 'bg-status-proceso-bg text-status-proceso',
  ready:        'bg-status-listo-bg text-status-listo',
  cancelled:    'bg-status-cancelado-bg text-status-cancelado',
}

const filteredOrders = computed(() => {
  let list = orders.value

  if (activeFilter.value !== 'all') {
    list = list.filter((o) => o.status === activeFilter.value)
  }

  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (o) =>
        o.customerName.toLowerCase().includes(q) ||
        String(o.id).includes(q),
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
watch(filteredOrders, (list) => {
  if (!list.find((o) => o.id === selectedOrder.value?.id)) {
    selectedOrder.value = list[0] ?? null
  }
}, { immediate: true })

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
  <div class="flex h-full w-full overflow-hidden">

    <!-- ── Left panel: list ──────────────────────────────────────────────── -->
    <div class="flex w-full flex-col border-r border-neutral-100 lg:w-[58%] xl:w-[60%]">

      <!-- Header -->
      <div class="border-b border-neutral-100 bg-white px-5 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-bold text-neutral-900">Pedidos</h1>
          <span class="text-sm text-neutral-400">{{ filteredOrders.length }} resultado{{ filteredOrders.length !== 1 ? 's' : '' }}</span>
        </div>

        <!-- Search -->
        <div class="relative mt-3">
          <svg class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Buscar por cliente o # pedido…"
            class="w-full rounded-xl border border-neutral-100 bg-neutral-50 py-2 pr-4 pl-9 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary focus:bg-white transition-colors"
          />
        </div>

        <!-- Filter tabs -->
        <div class="mt-3 flex gap-2 overflow-x-auto pb-0.5">
          <button
            v-for="tab in filterTabs"
            :key="tab.key"
            class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors cursor-pointer"
            :class="activeFilter === tab.key ? filterTabClass[tab.key] : 'bg-neutral-100 text-neutral-400 hover:bg-neutral-200'"
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
      <div class="flex-1 overflow-y-auto">
        <template v-if="filteredOrders.length">
          <OrderRow
            v-for="order in filteredOrders"
            :key="order.id"
            :order="order"
            :selected="selectedOrder?.id === order.id"
            @select="selectOrder"
          />
        </template>
        <div v-else class="flex flex-col items-center justify-center gap-2 py-20 text-neutral-400">
          <svg class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-sm">Sin resultados</p>
        </div>
      </div>
    </div>

    <!-- ── Right panel: detail ───────────────────────────────────────────── -->
    <div class="hidden lg:flex lg:w-[42%] xl:w-[40%] flex-col">
      <OrderDetailPanel
        v-if="selectedOrder"
        :order="selectedOrder"
        @advance="advance"
        @collect="collect"
        @cancel="cancel"
      />

      <!-- Empty state -->
      <div v-else class="flex flex-1 flex-col items-center justify-center gap-3 text-neutral-400">
        <svg class="h-12 w-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
        </svg>
        <p class="text-sm">Selecciona un pedido</p>
      </div>
    </div>

  </div>
</template>
