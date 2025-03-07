<template>
  <div class="city-view-container">
    <!------------------------- Banner ------------------------->
    <div class="banner" v-if="route.query.preview">
      <p>
        You are currently previewing {{ route.params.city }}. Click the
        <i class="fa-solid fa-plus"></i> icon to start tracking this city.
      </p>
    </div>

    <!------------------------- Weather overview ------------------------->
    <div class="weather-overview">
      <h1>{{ route.params.city }}, {{ route.params.state }}, {{ route.params.country }}</h1>
      <p class="date-time">
        {{ weather.localDateTime }}
      </p>
      <p class="temperature">{{ Math.round(weather.main.temp) }}&deg;C</p>

      <!------------------------- Weather details ------------------------->
      <div class="weather-details">
        <p>
          Description:
          {{ weather.weather[0].description }}
        </p>
        <p>
          Felt temperature:
          {{ Math.round(weather.main.feels_like) }}&deg;C
        </p>
        <p>
          Humidity level:
          {{ weather.main.humidity }}&percnt;
        </p>
        <img
          class="weather-icon"
          :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`"
          alt="Icon" />
      </div>
    </div>

    <hr />

    <div class="delete-btn-group">
      <DeleteButton @click="unstoreCity">
        <i class="fa-solid fa-trash"></i>
        <p>Delete {{ route.params.city }} from my favorites</p>
      </DeleteButton>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import DeleteButton from '@/components/DeleteButton.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useOpenWeatherStore } from '@/store/openWeather';
import { useCityStore } from '@/store/city';

const route = useRoute();

const openWeatherStore = useOpenWeatherStore();
const cityStore = useCityStore();

const weather = computed(() => openWeatherStore.weatherData);

const fetchWeatherData = async () => {
  try {
    await openWeatherStore.fetchWeatherData(route.query.lat, route.query.lng);
  } catch (error) {
    console.error(error);
  }
};
await fetchWeatherData();

const unstoreCity = async () => {
  const cityId = route.query.id;
  cityStore.unstoreCity(cityId);
  router.push({ name: 'home' });
};
</script>

<style lang="scss" scoped>
.city-view-container {
  @apply flex flex-1 flex-col items-center;

  .banner {
    @apply w-full text-center text-white p-4 bg-weather-secondary;
  }
}

.weather-overview {
  @apply py-12 flex flex-col items-center text-white;
}

h1 {
  @apply mb-2 text-4xl;
}

.date-time {
  @apply mb-12 text-sm capitalize;
}

.temperature {
  @apply mb-8 text-8xl;
}

.weather-details {
  @apply text-center;
}

.weather-icon {
  @apply h-auto w-[100%];
}

hr {
  @apply w-full border border-white border-opacity-10;
}

.hourly-weather-overview {
  @apply w-full py-12 max-w-screen-md;
}

h2 {
  @apply mb-4;
}

.hourly-weather {
  @apply gap-4 flex flex-col items-center;
}

.hour {
  @apply whitespace-nowrap;
}

.hourly-weather-icon {
  @apply h-auto w-[50px] object-cover;
}

.daily-weather-overview {
  @apply w-full max-w-screen-md py-12;
}

.daily-weather {
  @apply flex items-center;
}

.daily-weather-icon {
  @apply h-auto w-[50px] object-cover;
}

.daily-temperature {
  @apply flex flex-1 gap-2 justify-end;
}
.delete-btn-group {
  @apply py-12 flex justify-center;
}
</style>
