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
    <label class="truncae whitespace-nowrap">{{ label }}</label>
    <input
      v-if="!isTextArea"
      v-model="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      class="mt-2 w-full rounded-sm border border-gray-200 px-2 py-2 outline-none"
    />
    <textarea
      v-else
      v-model="value"
      :placeholder="placeholder"
      :rows="rows"
      class="mt-2 w-full rounded-sm border border-gray-200 px-2 py-2 outline-none"
    />
  </div>
</template>
