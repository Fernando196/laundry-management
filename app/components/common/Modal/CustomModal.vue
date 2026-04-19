<script setup lang="ts">
  import MapIcon from '../MapIcon/MapIcon.vue'

  interface Props {
    title: string
  }

  defineProps<Props>()
  defineEmits(['close'])
</script>
<template>
  <div class="relative flex h-auto w-auto flex-col bg-white">
    <header
      class="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-2 font-bold"
    >
      <h2 class="text-xl">{{ title }}</h2>
      <button class="h-6 w-6 cursor-pointer" @click="$emit('close')">
        <MapIcon name="close" class="stroke-black" />
      </button>
    </header>
    <main class="flex-1 overflow-hidden pb-20">
      <div class="overflow-y-auto">
        <slot />
      </div>
    </main>
    <footer
      class="absolute bottom-0 flex w-full justify-end gap-3 border-t border-gray-200 bg-white px-3 py-4"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>
