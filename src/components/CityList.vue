<template>
  <div id="city-list">
    <div v-for="city in storageData" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>
    <p v-if="storageData.length === 0">
      No location added. To start tracking a location, please search in the
      field above.
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStorageStore } from "@/store/storage";
import CityCard from "./CityCard.vue";

// retrieveCity() from storage.js in store
const storageStore = useStorageStore();
console.log(storageStore);
const storageData = computed(() => storageStore.storageData);

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "city",
    params: { city: city.city, state: city.state, country: city.country },
    query: {
      id: city.id,
      lat: city.coordinates.lat,
      lng: city.coordinates.lng,
    },
  });
};
</script>

<style lang="scss" scoped>
#city-list {
  @apply flex flex-col space-y-2;
}
</style>
