<template>
  <div>
    <suspense>
      <AsyncCityView />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>
