<script setup lang="ts">
  import type { MenuItem } from '~/types/menu.type'
  import MapIcon from '../common/MapIcon/MapIcon.vue'

  const router = useRoute()

  const menuItems: MenuItem[] = [
    {
      id: 1,
      label: 'Dashboard',
      href: '/',
      icon: 'dashboard',
    },
    {
      id: 2,
      label: 'Pedidos',
      href: '/orders',
      icon: 'order',
    },
    {
      id: 3,
      label: 'Control',
      href: '/machine-control',
      icon: 'laundry',
    },
    {
      id: 4,
      label: 'Inventario',
      href: '/inventory',
      icon: 'inventory',
    },
    {
      id: 5,
      label: 'Usuarios',
      href: '/users',
      icon: 'users',
    },
  ]
</script>
<template>
  <div
    class="relative flex h-full w-25 flex-col border-r-gray-300 bg-white text-black shadow-md xl:w-40"
  >
    <ul>
      <li
        v-for="item in menuItems"
        :key="'menu-item-' + item.id"
        class="border-b border-b-gray-300"
      >
        <NuxtLink
          class="flex flex-col items-center gap-2 fill-none px-2 py-3 text-[13px] xl:text-base"
          :to="item.href"
          :class="[
            router.path === item.href
              ? 'bg-primary-light text-primary stroke-primary'
              : 'stroke-primary',
          ]"
        >
          <MapIcon :name="item.icon" class="w-6 xl:w-8" />
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
