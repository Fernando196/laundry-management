<script setup lang="ts">
  import { Doughnut } from 'vue-chartjs'
  import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

  ChartJS.register(ArcElement, Tooltip)

  interface Props {
    pending: number
    inProcess: number
    ready: number
    canceled: number
  }

  const props = defineProps<Props>()

  const COLORS = ['#F59E0B', '#06B6D4', '#007b6c', '#F43F5E']

  const chartData = computed(() => ({
    labels: ['Pendiente', 'En proceso', 'Listo', 'Cancelado'],
    datasets: [
      {
        data: [props.pending, props.inProcess, props.ready, props.canceled],
        backgroundColor: COLORS,
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  }))

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { label: string; parsed: number }) => `  ${ctx.label}: ${ctx.parsed}`,
        },
      },
    },
  }

  const total = computed(() => props.pending + props.inProcess + props.ready + props.canceled)

  const legendItems = computed(() => [
    { label: 'Pendiente', count: props.pending, color: COLORS[0] },
    { label: 'En proceso', count: props.inProcess, color: COLORS[1] },
    { label: 'Listo', count: props.ready, color: COLORS[2] },
    { label: 'Cancelado', count: props.canceled, color: COLORS[3] },
  ])
</script>

<template>
  <div class="flex flex-col rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
    <div class="mb-4 flex items-start justify-between">
      <div>
        <p class="text-sm font-semibold text-neutral-900">Estado de pedidos</p>
        <p class="text-xs text-neutral-400">{{ total }} en total</p>
      </div>
    </div>

    <!-- Donut with center label -->
    <div class="relative" style="height: 160px">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div
        class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      >
        <span class="text-2xl font-bold text-neutral-900">{{ total }}</span>
        <span class="text-[11px] text-neutral-400">pedidos</span>
      </div>
    </div>

    <!-- Custom legend -->
    <div class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
      <div v-for="item in legendItems" :key="item.label" class="flex items-center gap-2">
        <span
          class="h-2.5 w-2.5 shrink-0 rounded-full"
          :style="{ backgroundColor: item.color }"
        />
        <span class="min-w-0 truncate text-xs text-neutral-500">{{ item.label }}</span>
        <span class="ml-auto text-xs font-semibold text-neutral-900">{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>
