<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

interface Props {
  labels: string[]
  data: number[]
}

const props = defineProps<Props>()

const weekTotal = computed(() => props.data.reduce((a, b) => a + b, 0))

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Pedidos',
      data: props.data,
      backgroundColor: '#007b6c',
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: { parsed: { y: number } }) => ` ${ctx.parsed.y} pedidos`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: '#94A3B8', font: { size: 12 } },
    },
    y: {
      grid: { color: '#E2E8F0' },
      border: { display: false, dash: [4, 4] },
      ticks: { color: '#94A3B8', font: { size: 12 }, stepSize: 2 },
    },
  },
}
</script>

<template>
  <div class="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
    <div class="mb-4 flex items-start justify-between">
      <div>
        <p class="text-sm font-semibold text-neutral-900">Pedidos</p>
        <p class="text-xs text-neutral-400">Últimos 7 días</p>
      </div>
      <div class="text-right">
        <p class="text-xl font-bold text-neutral-900">{{ weekTotal }}</p>
        <p class="text-xs text-neutral-400">esta semana</p>
      </div>
    </div>
    <div class="min-h-0 flex-1">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
