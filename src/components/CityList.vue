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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
// import { apiWrapper } from "@/services/api";
import { useStorageStore } from "@/store/storage";
import CityCard from "./CityCard.vue";

const storageStore = useStorageStore();
console.log(storageStore);
const storageData = computed(() => storageStore.storageData);

// const storedCity = ref([]);
// const retrieveCity = async () => {
//   if (localStorage.getItem("storedCity")) {
//     storedCity.value = JSON.parse(localStorage.getItem("storedCity"));
//     const parsedCity = storedCity.value;

//     const cityArray = [];
//     parsedCity.forEach((city) => {
//       const apiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;
//       const apiRoute = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lng}&appid=${apiKey}&units=metric`;
//       cityArray.push(apiWrapper.get(apiRoute));
//     });

//     const weatherData = await Promise.all(cityArray);
//     await new Promise((timeout) => setTimeout(timeout, 1000));
//     weatherData.forEach((value, index) => {
//       storedCity.value[index].weather = value.data;
//     });
//   }
// };
// await retrieveCity();

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
