<template>
  <div>
    <suspense>
      <async-city-view></async-city-view>
      <template #fallback>
        <city-view-skeleton></city-view-skeleton>
      </template>
    </suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "@/components/AsyncCityView.vue";
import CityViewSkeleton from "@/components/CityViewSkeleton.vue";
</script>
