<script setup lang="ts">
  import KpiCard from '~/components/dashboard/KpiCard.vue'
  import OrdersBarChart from '~/components/dashboard/OrdersBarChart.vue'
  import StatusDonutChart from '~/components/dashboard/StatusDonutChart.vue'
  import RevenueLineChart from '~/components/dashboard/RevenueLineChart.vue'
  import { useOrderStore } from '~/store/orders.store'
  import { ORDER_STATUS_TYPE, ORDER_STATUS_CATALOG } from '~/const/orders.const'
  import { useMachineStore } from '~/store/machine.store'

  const machineStore = useMachineStore()
  const machines = computed(() => machineStore.machines)
  const ordersStore = useOrderStore()
  const orders = computed(() => ordersStore.orders)

  const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  function toDateStr(d: Date) {
    return d.toISOString().split('T')[0]!
  }

  function offsetDate(days: number) {
    const d = new Date('2026-04-12')
    d.setDate(d.getDate() + days)
    return d
  }

  const todayStr = toDateStr(offsetDate(0))
  const yesterdayStr = toDateStr(offsetDate(-1))

  const todayOrders = computed(() => orders.value.filter((o) => o?.createdAt?.startsWith(todayStr)))
  const yesterdayOrders = computed(() =>
    orders.value.filter((o) => o?.createdAt?.startsWith(yesterdayStr))
  )

  const todayRevenue = computed(() =>
    todayOrders.value.filter((o) => o.status === 'ready').reduce((s, o) => s + o.amount, 0)
  )

  const pendingOrders = computed(() => orders.value.filter((o) => o.status === 'pending').length)

  const activeMachines = computed(
    () => machines.value.filter((m) => m.status === 'running' || m.status === 'active').length
  )

  const orderDiff = computed(() => todayOrders.value.length - yesterdayOrders.value.length)
  const diffLabel = computed(() => {
    if (orderDiff.value === 0) return 'igual que ayer'
    return `${orderDiff.value > 0 ? '+' : ''}${orderDiff.value} vs ayer`
  })

  const barLabels = computed(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = offsetDate(i - 6)
      return DAY_LABELS[d.getDay()]!
    })
  )

  const barData = computed(() =>
    Array.from({ length: 7 }, (_, i) => {
      const ds = toDateStr(offsetDate(i - 6))
      return orders.value.filter((o) => o?.createdAt?.startsWith(ds)).length
    })
  )

  const statusCounts = computed(() => ({
    pending: orders.value.filter((o) => o.status === ORDER_STATUS_TYPE.PENDING).length,
    inProcess: orders.value.filter((o) => o.status === ORDER_STATUS_TYPE['IN-PROCESS']).length,
    ready: orders.value.filter((o) => o.status === ORDER_STATUS_TYPE.READY).length,
    canceled: orders.value.filter((o) => o.status === ORDER_STATUS_TYPE.CANCELED).length,
  }))

  const lineLabels = computed(() =>
    Array.from({ length: 30 }, (_, i) => {
      const d = offsetDate(i - 29)
      return `${d.getDate()}/${d.getMonth() + 1}`
    })
  )

  const lineData = computed(() =>
    Array.from({ length: 30 }, (_, i) => {
      const ds = toDateStr(offsetDate(i - 29))
      return orders.value
        .filter((o) => o.status === 'ready' && o?.createdAt?.startsWith(ds))
        .reduce((s, o) => s + o.amount, 0)
    })
  )

  const recentOrders = computed(() =>
    [...orders.value]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  )

  const formattedDate = computed(() => {
    const d = offsetDate(0)
    return d.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  })

  const greeting = computed(() => {
    const h = new Date().getHours()
    if (h < 12) return 'Buenos días'
    if (h < 19) return 'Buenas tardes'
    return 'Buenas noches'
  })
</script>

<template>
  <div class="h-full w-full overflow-auto">
    <div class="mx-auto max-w-7xl p-6">
      <!-- Header -->
      <div class="mb-6 flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-medium text-neutral-400">{{ greeting }}</p>
          <h1 class="mt-0.5 text-xl font-bold text-neutral-900">Dashboard</h1>
          <p class="text-sm text-neutral-400">Resumen operativo del día</p>
        </div>
        <div
          class="shrink-0 rounded-xl border border-neutral-100 bg-white px-4 py-2.5 text-right shadow-sm"
        >
          <p class="text-xs font-medium capitalize text-neutral-900">{{ formattedDate }}</p>
          <p class="mt-0.5 text-[11px] text-neutral-400">
            {{ todayOrders.length }} pedidos · {{ activeMachines }} máquinas activas
          </p>
        </div>
      </div>

      <!-- Layout: sidebar + charts -->
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start">
        <!-- Sidebar: KPIs + donut -->
        <div class="shrink-0 lg:w-64">
          <div class="grid grid-cols-2 gap-3 lg:grid-cols-1">
            <KpiCard
              title="Pedidos hoy"
              :value="todayOrders.length"
              :subtitle="diffLabel"
              accent="primary"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </template>
            </KpiCard>

            <KpiCard
              title="Ingresos hoy"
              :value="`$${todayRevenue.toLocaleString('es-MX')}`"
              subtitle="pedidos completados"
              accent="ready"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </template>
            </KpiCard>

            <KpiCard
              title="Máquinas activas"
              :value="`${activeMachines} / ${machines.length}`"
              subtitle="en uso o disponibles"
              accent="secondary"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </template>
            </KpiCard>

            <KpiCard
              title="Pendientes de entrega"
              :value="pendingOrders"
              subtitle="por entregar"
              accent="pending"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </template>
            </KpiCard>
          </div>

          <!-- Donut chart -->
          <div class="mt-3">
            <ClientOnly>
              <StatusDonutChart v-bind="statusCounts" />
            </ClientOnly>
          </div>
        </div>

        <!-- Charts column -->
        <div class="min-w-0 flex-1 space-y-4">
          <div style="height: 280px">
            <ClientOnly>
              <OrdersBarChart :labels="barLabels" :data="barData" />
            </ClientOnly>
          </div>
          <div style="height: 280px">
            <ClientOnly>
              <RevenueLineChart :labels="lineLabels" :data="lineData" />
            </ClientOnly>
          </div>
        </div>
      </div>

      <!-- Recent orders -->
      <div class="mt-4 rounded-2xl border border-neutral-100 bg-white shadow-sm">
        <div class="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
          <div>
            <p class="text-sm font-semibold text-neutral-900">Últimos pedidos</p>
            <p class="text-xs text-neutral-400">Los 5 más recientes</p>
          </div>
          <NuxtLink
            to="/orders"
            class="text-xs font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Ver todos →
          </NuxtLink>
        </div>
        <div class="divide-y divide-neutral-50">
          <div
            v-for="order in recentOrders"
            :key="order.id"
            class="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-neutral-50"
          >
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-bold text-neutral-500"
            >
              #{{ order.id }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-neutral-900">{{ order.customerName }}</p>
              <p class="text-xs text-neutral-400">{{ order.createdAt?.split('T')[0] }}</p>
            </div>
            <span :class="['badge', `badge-${order.status}`]">
              {{ ORDER_STATUS_CATALOG[order.status]?.label ?? order.status }}
            </span>
            <p class="shrink-0 text-sm font-semibold text-neutral-900">
              ${{ order.amount.toLocaleString('es-MX') }}
            </p>
          </div>
          <div v-if="recentOrders.length === 0" class="px-5 py-8 text-center text-sm text-neutral-400">
            No hay pedidos registrados
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
