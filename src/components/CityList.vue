<template>
  <div class="list-of-cities">
    <div v-for="(city, index) in cities" :key="index">
      <CityCard :city="city" @click="goToCityView(city)"></CityCard>
    </div>
    <p v-if="cities.length === 0">
      No location added. To start tracking a location, please search in the field above.
    </p>
  </div>
</template>

<script setup>
import router from '@/router';
import CityCard from '#/CityCard.vue';

import { ref } from 'vue';
import { apiWrapper } from '@/services/api';

// Récupère une ville dans le local storage et la météo associée à celle-ci sur Open Weather.
const cities = ref([]);
const retrievedCities = localStorage.getItem('cities');

const retrieveCity = async () => {
  if (retrievedCities) {
    cities.value = JSON.parse(retrievedCities);

    const fetchWeatherData = async (city) => {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
      const apiRoute = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lng}&appid=${apiKey}&units=metric`;
      const weatherData = await apiWrapper.get(apiRoute);
      return { ...city, weather: weatherData };
    };

    cities.value = await Promise.all(cities.value.map(fetchWeatherData));
  }
};
await retrieveCity();

// Redirect to a specific "CityView" using the router vue query parameters.
const goToCityView = (city) => {
  router.push({
    name: 'city',
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
.list-of-cities {
  @apply flex flex-col space-y-2;
}
</style>
