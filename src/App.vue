<template>
  <div id="app">
    <NavigationBar />
    <Suspense>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <Component :is="Component" />
        </Transition>
      </RouterView>
    </Suspense>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import { onMounted } from 'vue';
import { useCityStore } from '@/store/city';

const cityStore = useCityStore();

onMounted(() => {
  cityStore.saveCities();
});
</script>

<style scoped lang="scss">
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
