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

// Const storedCity: stocke une ville dans un tableau de données.
const storedCity = ref([]);

// Function retrieveCity: récupère une ville.
const retrieveCity = async () => {
  // Method JSON.parse: analyse une chaîne de caractères JSON et construit la valeur JavaScript décrit par cette chaîne.
  const parseCity = JSON.parse(localStorage.getItem(storedCity));

  if (localStorage.getItem(storedCity)) {
    storedCity.value = parseCity;

    const request = [];
    const apiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;
    const apiRoute = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lng}&appid=${apiKey}&units=metric`;

    storedCity.value.forEach((city) => {
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
    query: { lat: city.Coordinates.lat, lng: city.Coordinates.lng },
  });
};
</script>

<style lang="scss" scoped></style>
