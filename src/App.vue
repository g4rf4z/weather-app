<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <suspense>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </suspense>
  </div>
</template>

<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<style lang="scss" scoped>
#app {
  @apply min-h-screen flex flex-col font-Roboto bg-weather-primary;
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
