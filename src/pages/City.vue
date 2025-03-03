<template>
  <main>
    <Suspense>
      <template #default>
        <AsyncCityView />
      </template>
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import AsyncCityView from '@/components/AsyncCityView.vue';
import CityViewSkeleton from '@/components/CityViewSkeleton.vue';

defineOptions({
  name: 'CityPage'
})
</script>