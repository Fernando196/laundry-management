<script setup lang="ts">
  import { useMenuStore } from '~/store/menu.store'
  import MapIcon from '../common/MapIcon/MapIcon.vue'

  const router = useRoute()
  const menuStore = useMenuStore()
  const menuItems = menuStore.menuItems

  const closeMenu = inject<() => void>('closeMenu')
</script>
<template>
  <div class="relative flex h-full w-full flex-col border-r-gray-300 bg-white text-black shadow-md">
    <ul>
      <li
        v-for="item in menuItems"
        :key="'menu-item-' + item.id"
        class="border-b border-b-gray-300"
      >
        <NuxtLink
          class="flex flex-col items-center gap-2 fill-none px-2 py-3 text-[13px] xl:text-base"
          :to="item.path"
          @click="closeMenu?.()"
          :class="[
            router.path === item.path
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
