<template>
  <div class="app-container">
    <site-navigation />
    <suspense>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </suspense>
  </div>
</template>

<script setup>
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style lang="scss" scoped>
.app-container {
  @apply flex flex-col min-h-screen font-Roboto bg-weather-primary;
}

.page-enter-active,
.page-leave-active {
  transition: 500ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
