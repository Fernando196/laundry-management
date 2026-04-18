<script setup lang="ts">
  import MapIcon from '../MapIcon/MapIcon.vue'

  interface Props {
    label: string
    placeholder: string
    options: Array<{ id: number; label: string }>
    disabled?: boolean
    iconLeft?: string
  }
  const props = defineProps<Props>()
</script>
<template>
  <div class="flex w-full flex-col">
    <label class="truncae whitespace-nowrap">{{ label }}</label>
    <div class="relative h-10 w-full">
      <input
        v-model="selected.label"
        :placeholder="placeholder"
        :disabled="disabled"
        class="mt-2 w-full rounded-sm border border-gray-200 px-2 py-2 outline-none"
      />
      <map-icon name="arrow-down" class="h-5 w-5" />
    </div>
  </div>
</template>
