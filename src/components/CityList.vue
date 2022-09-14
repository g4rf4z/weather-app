<template>
  <div v-for="city in storedCity" :key="city.id">
    <CityCard :city="city" />
  </div>
</template>

<script setup>
import { ref } from "vue";
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
    const openWeatherKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;

    storedCity.value.forEach((city) => {
      request.push(
        apiWrapper.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.Coordinates.lat}&lon=${city.Coordinates.lng}&appid=${openWeatherKey}&units=metric`
        )
      );
    });

    const weatherData = await Promise.all(request);

    weatherData.forEach((value, index) => {
      storedCity.value[index].weather = value.data;
    });
  }
};
await retrieveCity();
</script>

<style lang="scss" scoped></style>
