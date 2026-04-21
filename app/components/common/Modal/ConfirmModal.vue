<script setup lang="ts">
  import type { Icons } from '~/types/icons.type'
  import MapIcon from '../MapIcon/MapIcon.vue'

  interface Props {
    title: string
    icon?: Icons
    description?: string
    confirmText?: string
  }

  defineProps<Props>()
  defineEmits(['close'])

  const { close } = useModal()
</script>
<template>
  <div class="relative flex h-auto w-auto flex-col rounded-2xl bg-white text-black">
    <button class="absolute top-3 right-5 h-6 w-6 cursor-pointer" @click="$emit('close')">
      <MapIcon name="close" class="stroke-black" />
    </button>

    <main class="flex flex-1 flex-col px-3 text-center">
      <h2 class="text-xl">{{ title }}</h2>
      <span v-if="description" class="mt-4 text-neutral-500">{{ description }}</span>
    </main>
    <footer class="flex w-full justify-end gap-3 border-t border-t-gray-200 px-3 py-4">
      <button class="rounded-md bg-gray-200 px-5 py-1 text-gray-500" @click="close(false)">
        Cancelar
      </button>
      <button class="bg-primary rounded-md px-5 py-1 text-white" @click="close(true)">
        {{ confirmText ?? 'Confirmar' }}
      </button>
    </footer>
  </div>
</template>
