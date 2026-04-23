<script setup lang="ts">
  import type { InputTypeHTMLAttribute } from 'vue'

  interface Props {
    label: string
    type: InputTypeHTMLAttribute
    disabled?: boolean
    isTextArea?: boolean
    rows?: number
    placeholder?: string
  }
  defineProps<Props>()

  const value = defineModel<number | string | null>()
</script>
<template>
  <div class="flex w-full flex-col">
    <label class="truncae text-muted text-[12.5px] font-medium whitespace-nowrap">{{
      label
    }}</label>
    <input
      v-if="!isTextArea"
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      class="border-border transition-border focus:border-primary focus:shadow-soft mt-2 h-9 w-full rounded-sm border px-2.5 py-2 text-[13.5px] outline outline-none"
    />
    <textarea
      v-else
      v-model="value"
      :placeholder="placeholder"
      :rows="rows || 3"
      class="border-border focus:border-primary shadow-soft mt-2 w-full rounded-sm border px-2 py-2 outline-none"
    />
  </div>
</template>
