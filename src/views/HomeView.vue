<template>
  <main>
    <search></search>
    <suspense>
      <list-of-cities></list-of-cities>
      <template #fallback>
        <city-card-skeleton></city-card-skeleton>
      </template>
    </suspense>
  </main>
</template>

<script setup>
import Search from "@/components/Search.vue";
import ListOfCities from "@/components/ListOfCities.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";
</script>

<style lang="scss" scoped>
main {
  @apply container text-white;
}
</style>
