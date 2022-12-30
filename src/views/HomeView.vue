<template>
  <main>
    <search></search>
    <suspense>
      <city-list></city-list>
      <template #fallback>
        <city-card-skeleton></city-card-skeleton>
      </template>
    </suspense>
  </main>
</template>

<script setup>
import Search from "@/components/Search.vue";
import CityList from "@/components/CityList.vue";

import CityCardSkeleton from "@/components/CityCardSkeleton.vue";
</script>

<style lang="scss" scoped>
main {
  @apply container text-white;
}
</style>
