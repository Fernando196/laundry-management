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
  <div class="relative flex h-auto w-auto flex-col bg-white text-black">
    <button class="absolute top-3 right-5 h-6 w-6 cursor-pointer" @click="$emit('close')">
      <MapIcon name="close" class="stroke-black" />
    </button>

    <section class="mt-5 flex h-37.5 flex-col border-b border-gray-200 px-3 py-2 text-center">
      <h2 class="text-xl">{{ title }}</h2>
      <span v-if="description" class="text-neutral-500">{{ description }}</span>
    </section>
    <footer
      class="absolute bottom-0 flex w-full justify-end gap-3 border-t border-gray-200 px-3 py-4"
    >
      <button class="rounded-md bg-gray-200 px-5 py-1 text-gray-500" @click="close(false)">
        Cancelar
      </button>
      <button class="bg-primary rounded-md px-5 py-1 text-white" @click="close(true)">
        {{ confirmText ?? 'Confirmar' }}
      </button>
    </footer>
  </div>
</template>
