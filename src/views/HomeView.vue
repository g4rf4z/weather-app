<template>
  <main>
    <Search />
    <Suspense>
      <template #default>
        <CityList />
      </template>
      <template #fallback>
        <CityCardSkeleton />
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import Search from '@/components/Search.vue';
import CityList from '@/components/CityList.vue';
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';
</script>

<style scoped lang="scss">
main {
  @apply container text-white;
}
</style>
