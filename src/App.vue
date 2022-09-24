<template>
  <div class="app-container">
    <site-navigation />
    <suspense>
      <router-view />
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
</style>
