<script setup lang="ts">
  import { orders } from '~/data/orders.data'
  import { machines } from '~/data/machines.data'
  import KpiCard from '~/components/dashboard/KpiCard.vue'
  import OrdersBarChart from '~/components/dashboard/OrdersBarChart.vue'
  import StatusDonutChart from '~/components/dashboard/StatusDonutChart.vue'
  import RevenueLineChart from '~/components/dashboard/RevenueLineChart.vue'

  // ── Helpers ────────────────────────────────────────────────
  const DAY_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  function toDateStr(d: Date) {
    return d.toISOString().split('T')[0]!
  }

  function offsetDate(days: number) {
    const d = new Date('2026-04-12')
    d.setDate(d.getDate() + days)
    return d
  }

  // ── KPIs ───────────────────────────────────────────────────
  const todayStr = toDateStr(offsetDate(0))
  const yesterdayStr = toDateStr(offsetDate(-1))

  const todayOrders = computed(() => orders.filter((o) => o?.createdAt?.startsWith(todayStr)))
  const yesterdayOrders = computed(() =>
    orders.filter((o) => o?.createdAt?.startsWith(yesterdayStr))
  )

  const todayRevenue = computed(() =>
    todayOrders.value.filter((o) => o.status === 'ready').reduce((s, o) => s + o.amount, 0)
  )

  const pendingOrders = computed(() => orders.filter((o) => o.status === 'pending').length)

  const activeMachines = computed(
    () => machines.filter((m) => m.status === 'running' || m.status === 'active').length
  )

  const orderDiff = computed(() => todayOrders.value.length - yesterdayOrders.value.length)
  const diffLabel = computed(() => {
    if (orderDiff.value === 0) return 'igual que ayer'
    return `${orderDiff.value > 0 ? '+' : ''}${orderDiff.value} vs ayer`
  })

  // ── Bar chart: pedidos últimos 7 días ──────────────────────
  const barLabels = computed(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = offsetDate(i - 6)
      return DAY_LABELS[d.getDay()]!
    })
  )

  const barData = computed(() =>
    Array.from({ length: 7 }, (_, i) => {
      const ds = toDateStr(offsetDate(i - 6))
      return orders.filter((o) => o?.createdAt?.startsWith(ds)).length
    })
  )

  // ── Donut: distribución de estados ─────────────────────────
  const statusCounts = computed(() => ({
    pending: orders.filter((o) => o.status === 'pending').length,
    inProcess: orders.filter((o) => o.status === 'in-process').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  }))

  // ── Line chart: ingresos últimos 30 días ───────────────────
  const lineLabels = computed(() =>
    Array.from({ length: 30 }, (_, i) => {
      const d = offsetDate(i - 29)
      return `${d.getDate()}/${d.getMonth() + 1}`
    })
  )

  const lineData = computed(() =>
    Array.from({ length: 30 }, (_, i) => {
      const ds = toDateStr(offsetDate(i - 29))
      return orders
        .filter((o) => o.status === 'ready' && o?.createdAt?.startsWith(ds))
        .reduce((s, o) => s + o.amount, 0)
    })
  )
</script>

<template>
  <div class="h-full w-full overflow-auto">
    <div class="mx-auto max-w-7xl space-y-6 p-6">
      <!-- Page title -->
      <div>
        <h1 class="text-xl font-bold text-neutral-900">Dashboard</h1>
        <p class="text-sm text-neutral-400">Resumen operativo — 12 de abril 2026</p>
      </div>

      <!-- KPI cards -->
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          title="Pedidos hoy"
          :value="todayOrders.length"
          :subtitle="diffLabel"
          accent="primary"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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
          accent="listo"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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
              width="22"
              height="22"
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
          accent="pendiente"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
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

      <!-- Charts row: bar + donut -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div class="lg:col-span-8" style="height: 280px">
          <ClientOnly>
            <OrdersBarChart :labels="barLabels" :data="barData" />
          </ClientOnly>
        </div>
        <div class="lg:col-span-4">
          <ClientOnly>
            <StatusDonutChart v-bind="statusCounts" />
          </ClientOnly>
        </div>
      </div>

      <!-- Line chart: revenue -->
      <div style="height: 260px">
        <ClientOnly>
          <RevenueLineChart :labels="lineLabels" :data="lineData" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
