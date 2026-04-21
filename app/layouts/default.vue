<script setup lang="ts">
  import MapIcon from '~/components/common/MapIcon/MapIcon.vue'
  import AppHeader from '~/components/layout/AppHeader.vue'
  import SidebarNavMenu from '~/components/layout/SidebarNavMenu.vue'

  const isOpenMenu = ref(false)

  onMounted(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        isOpenMenu.value = false
      }
    })
  })

  provide('closeMenu', () => {
    isOpenMenu.value = false
  })
</script>
<template>
  <div class="relative grid h-screen grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
    <Transition name="fade">
      <div v-if="isOpenMenu" class="absolute top-0 z-0 h-screen w-full bg-[rgba(0,0,0,0.5)]" />
    </Transition>
    <AppHeader class="col-span-2" />
    <div
      class="absolute h-screen w-[40vw] transition-transform duration-300 ease-in-out md:relative md:h-full md:w-25 xl:w-40"
      :class="isOpenMenu ? 'z-10 translate-x-0' : '-translate-x-full md:translate-x-0'"
    >
      <SidebarNavMenu />
    </div>
    <main class="col-span-2 overflow-x-hidden overflow-y-auto bg-neutral-50 md:col-span-1">
      <slot />
    </main>
    <button
      class="absolute right-3 bottom-3 z-10 rounded-full border border-gray-200 bg-white p-3 shadow-2xl md:hidden"
      @click="isOpenMenu = !isOpenMenu"
    >
      <MapIcon name="menu" class="stroke-primary h-5 w-5" />
    </button>
  </div>
</template>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
