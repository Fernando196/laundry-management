<script setup lang="ts">
import type { MenuItem } from '~/types/menu.type';
import MapIcon from '../common/MapIcon/MapIcon.vue';

const router = useRoute();

const menuItems: MenuItem[] = [
    {
        id: 1,
        label: 'Dashboard',
        href: '/',
        icon: 'dashboard'
    },
    {
        id: 2,
        label: 'Control',
        href: '/laundry-control',
        icon: 'laundry'
    },
    {
        id: 3,
        label: 'Inventario',
        href: '/inventory',
        icon: 'inventory'
    },
    {
        id: 4,
        label: 'Usuarios',
        href: '/users',
        icon: 'users'
    },
]

</script>
<template>
    <div class="w-40 h-full flex flex-col relative bg-white shadow-md border-r-gray-300 text-black">
        <ul>
            <li v-for="item in menuItems" class="border-b border-b-gray-300">
                <NuxtLink class="flex flex-col text-base gap-2 items-center fill-none px-2 py-3" :to="item.href"
                    :class="[router.path === item.href ? 'bg-primary-light text-primary stroke-primary' : 'stroke-primary']">
                    <MapIcon :name="item.icon" class="w-8" />
                    {{ item.label }}
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>