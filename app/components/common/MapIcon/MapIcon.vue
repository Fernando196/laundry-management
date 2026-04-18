<script setup lang="ts">
  import type { Icons } from '~/types/icons.type'

  const componentMap: Record<Icons, Component> = {
    dashboard: defineAsyncComponent(() => import('./icons/DashboardIcon.vue')),
    laundry: defineAsyncComponent(() => import('./icons/LaundryIcon.vue')),
    inventory: defineAsyncComponent(() => import('./icons/IventoryIcon.vue')),
    users: defineAsyncComponent(() => import('./icons/UsersIcon.vue')),
    config: defineAsyncComponent(() => import('./icons/ConfigIcon.vue')),
    info: defineAsyncComponent(() => import('./icons/InfoIcon.vue')),
    order: defineAsyncComponent(() => import('./icons/OrderIcon.vue')),
    file: defineAsyncComponent(() => import('./icons/FileIcon.vue')),
    close: defineAsyncComponent(() => import('./icons/CloseIcon.vue')),
    search: defineAsyncComponent(() => import('./icons/SearchIcon.vue')),
    add: defineAsyncComponent(() => import('./icons/AddIcon.vue')),
    time: defineAsyncComponent(() => import('./icons/TimeIcon.vue')),
    delete: defineAsyncComponent(() => import('./icons/DeleteIcon.vue')),
    money: defineAsyncComponent(() => import('./icons/Money.vue')),
    edit: defineAsyncComponent(() => import('./icons/EditIcon.vue')),
  }
  defineProps<{
    name: Icons
  }>()
</script>
<template>
  <component :is="componentMap[name]" v-bind="$attrs" />
</template>
