<template>
  <div id="city-list">
    <div v-for="city in storedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>
    <p v-if="storedCities.length === 0">
      No location added. To start tracking a location, please search in the
      field above.
    </p>
  </div>
</template>

<script setup>
import router from "@/router";
import CityCard from "./CityCard.vue";
import { ref } from "vue";
import { apiWrapper } from "@/services/api";

// Récupère une ville dans le local storage et la météo associée à celle-ci sur Open Weather.
const storedCities = ref([]);
const retrievedCities = localStorage.getItem("storedCities");
const retrieveCity = async () => {
  if (retrievedCities) {
    storedCities.value = JSON.parse(retrievedCities);
    const weatherData = [];
    storedCities.value.forEach((city) => {
      const apiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;
      const apiRoute = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lng}&appid=${apiKey}&units=metric`;
      const weatherDataFound = apiWrapper.get(apiRoute);
      weatherData.push(weatherDataFound);
    });
    const citiesWeatherData = await Promise.all(weatherData);
    citiesWeatherData.forEach((value, index) => {
      storedCities.value[index].weather = value.data;
      console.log(citiesWeatherData);
    });
  }
};
await retrieveCity();

// Redirige vers CityView.
const goToCityView = (city) => {
  router.push({
    name: "city",
    params: {
      id: city.id,
      city: city.city,
      state: city.state,
      country: city.country,
    },
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
  @apply space-y-2 flex flex-col;
}
</style>
