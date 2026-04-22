<script setup lang="ts">
  import MapIcon from '~/components/common/MapIcon/MapIcon.vue'
  import { useMenuStore } from '~/store/menu.store'

  const menuStore = useMenuStore()
  const childrenItem = menuStore.childrenItems
</script>
<template>
  <div class="grid h-full w-full grid-cols-12 content-start gap-5 p-5">
    <NuxtLink
      v-for="item in childrenItem"
      :key="'item-children-' + item.id"
      :to="item.path"
      class="hover:bg-primary-light col-span-12 flex flex-col gap-3 rounded-2xl border border-gray-300 bg-white p-5 shadow-md hover:cursor-pointer md:col-span-6 lg:col-span-4"
    >
      <div class="flex items-center gap-3">
        <MapIcon :name="item.icon" class="fill-primary w-6 stroke-white xl:w-8" />
        <h1 class="text-base font-bold">{{ item.label }}</h1>
      </div>
      <span class="text-justify text-sm text-gray-500">{{ item.description }}</span>
    </NuxtLink>
  </div>
</template>
