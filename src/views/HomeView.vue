<template>
  <main>
    <Search />
    <Suspense>
      <CityList />
      <template #fallback>
        <CityCardSkeleton />
      </template>
    </Suspense>
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
