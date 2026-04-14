<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  subtitle?: string
  accent?: 'primary' | 'secondary' | 'accent' | 'listo' | 'pendiente'
}

withDefaults(defineProps<Props>(), { accent: 'primary' })

const accentMap = {
  primary: { bg: 'bg-primary-light', text: 'text-primary', value: 'text-primary' },
  secondary: { bg: 'bg-secondary-light', text: 'text-secondary', value: 'text-secondary' },
  accent: { bg: 'bg-accent-light', text: 'text-accent', value: 'text-accent' },
  listo: { bg: 'bg-status-listo-bg', text: 'text-status-listo', value: 'text-status-listo' },
  pendiente: { bg: 'bg-status-pendiente-bg', text: 'text-status-pendiente', value: 'text-status-pendiente' },
}
</script>

<template>
  <div class="flex items-center gap-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm">
    <!-- Icon -->
    <div :class="[accentMap[accent].bg, accentMap[accent].text]" class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
      <slot name="icon" />
    </div>

    <!-- Content -->
    <div class="min-w-0">
      <p class="truncate text-xs font-medium tracking-wide text-neutral-400 uppercase">{{ title }}</p>
      <p :class="accentMap[accent].value" class="text-2xl font-bold leading-tight">{{ value }}</p>
      <p v-if="subtitle" class="mt-0.5 text-xs text-neutral-400">{{ subtitle }}</p>
    </div>
  </div>
</template>
