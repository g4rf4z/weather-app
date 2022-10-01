<template>
  <div id="container">
    <NavigationBar />
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
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<style lang="scss" scoped>
#container {
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
