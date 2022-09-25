<template>
  <div v-for="city in storedCity" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>
  <p v-if="storedCity.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { apiWrapper } from "../services/api";
import CityCard from "./CityCard.vue";

const storedCity = ref([]);
const retrieveCity = async () => {
  if (localStorage.getItem("storedCity")) {
    storedCity.value = JSON.parse(localStorage.getItem("storedCity"));

    const request = [];
    storedCity.value.forEach((city) => {
      const apiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;
      const apiRoute = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lng}&appid=${apiKey}&units=metric`;
      request.push(apiWrapper.get(apiRoute));
    });

    const weatherData = await Promise.all(request);
    weatherData.forEach((value, index) => {
      storedCity.value[index].weather = value.data;
    });
  }
};
await retrieveCity();

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: { lat: city.coordinates.lat, lng: city.coordinates.lng },
  });
};
</script>

<style lang="scss" scoped></style>
