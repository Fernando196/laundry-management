<script setup lang="ts">
import type { Icons } from '~/types/icons.type';

const componentMap: Record<Icons, Component> = {
    dashboard: defineAsyncComponent(() => import('./icons/DashboardIcon.vue')),
    laundry: defineAsyncComponent(() => import('./icons/LaundryIcon.vue')),
    inventory: defineAsyncComponent(() => import('./icons/IventoryIcon.vue')),
    users: defineAsyncComponent(() => import('./icons/UsersIcon.vue')),
    config: defineAsyncComponent(() => import('./icons/ConfigIcon.vue')),
    info: defineAsyncComponent(() => import('./icons/InfoIcon.vue')),
    order: defineAsyncComponent(() => import('./icons/OrderIcon.vue'))
}
defineProps<{
    name: Icons
}>()
</script>
<template>
    <component :is="componentMap[name]" v-bind="$attrs" />
</template>