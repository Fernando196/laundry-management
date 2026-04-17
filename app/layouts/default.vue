<script setup lang="ts">
  import AppHeader from '~/components/layout/AppHeader.vue'
  import SidebarNavMenu from '~/components/layout/SidebarNavMenu.vue'
</script>
<template>
  <div class="grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
    <AppHeader class="col-span-2" />
    <SidebarNavMenu />
    <main class="overflow-x-hidden overflow-y-auto bg-neutral-50">
      <slot />
    </main>
  </div>
</template>
