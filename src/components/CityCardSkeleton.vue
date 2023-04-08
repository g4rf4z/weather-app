<template>
  <div class="py-6 px-3 flex rounded-md shadow-md bg-weather-secondary">
    <div class="left-placeholder-group">
      <AnimatedPlaceholder class="max-w-[75%]" />
      <AnimatedPlaceholder class="max-w-[50%]" />
    </div>
    <div class="right-placeholder-group">
      <AnimatedPlaceholder class="max-w-[25%] w-full" />
      <AnimatedPlaceholder class="max-w-[50%] w-full" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>

<style lang="scss" scoped>
.city-card-skeleton {
  @apply py-6 px-3 flex rounded-md shadow-md bg-weather-secondary;
}
.left-placeholder-group {
  @apply flex flex-col flex-1 gap-2;
}

.right-placeholder-group {
  @apply flex flex-col flex-1 gap-2 items-end;
}
</style>
