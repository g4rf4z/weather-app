<template>
  <div class="container text-white">
    <Search />
    <Suspense>
      <template #default>
        <CityList />
      </template>
      <template #fallback>
        <CityCardSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import Search from '@/components/Search.vue';
import CityList from '@/components/CityList.vue';
import CityCardSkeleton from '@/components/CityCardSkeleton.vue';
</script>
