<template>
  <div id="container">
    <!------------------------- Banner ------------------------->
    <div id="banner" v-if="route.query.preview">
      <p>You are currently previewing {{ route.params.city }}. Click the <i class="fa-solid fa-plus"></i> icon to start tracking this city.</p>
    </div>

    <!------------------------- Weather overview ------------------------->
    <div id="weather-overview">
      <h1>
        {{ route.params.city }}, {{ route.params.state }},
        {{ route.params.country }}
      </h1>
      <p id="date-time">
        {{
          new Date(weather.currentTime).toLocaleDateString("en", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weather.currentTime).toLocaleTimeString("fr", {
            timeStyle: "short",
          })
        }}
      </p>
      <p id="temperature">{{ Math.round(weather.current?.temp) }}&deg;C</p>

      <!------------------------- Weather details ------------------------->
      <div id="weather-details">
        <p>
          Description:
          {{ weather.current?.weather[0].description }}
        </p>
        <p>
          Felt temperature:
          {{ Math.round(weather.current?.feels_like) }}&deg;C
        </p>
        <p>
          Humidity level:
          {{ weather.current?.humidity }}&percnt;
        </p>
        <img id="weather-icon" :src="`http://openweathermap.org/img/wn/${weather.current?.weather[0].icon}@2x.png`" alt="Icon" />
      </div>
    </div>

    <hr />

    <!------------------------- Hourly weather ------------------------->
    <div id="hourly-weather-overview">
      <div class="mx-8 text-white">
        <h2>Hourly weather</h2>
        <div class="flex gap-8 overflow-x-scroll">
          <div id="hourly-weather" v-for="hour in weather.hourly" :key="hour.dt">
            <p id="hour">
              {{
                new Date(hour.currentTime).toLocaleTimeString("fr", {
                  hour: "numeric",
                })
              }}
            </p>
            <img id="hourly-weather-icon" :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`" alt="Icon" />
            <p class="text-xl">{{ Math.round(hour.temp) }}&deg;C</p>
          </div>
        </div>
      </div>
    </div>

    <hr />

    <!------------------------- Daily weather ------------------------->
    <div id="daily-weather-overview">
      <div class="mx-8 text-white">
        <h2>Seven days forecast</h2>
        <div id="daily-weather" v-for="day in weather.daily" :key="day.dt">
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en", {
                weekday: "long",
              })
            }}
          </p>
          <img id="daily-weather-icon" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="Icon" />
          <div id="daily-temperature">
            <p>Min: {{ Math.round(day.temp.min) }}&deg;C</p>
            <p>Max: {{ Math.round(day.temp.max) }}&deg;C</p>
          </div>
        </div>
      </div>
      <div class="delete-btn-group">
        <DeleteButton @click="unstoreCity">
          <i class="fa-solid fa-trash"></i>
          <p>Delete {{ route.params.city }} from my favorites</p>
        </DeleteButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import DeleteButton from "#/DeleteButton.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";
import { useWeatherStore } from "@/store/weather";

const route = useRoute();

const weatherStore = useWeatherStore();

const weather = computed(() => weatherStore.weatherData);

const retrieveWeatherData = async () => {
  try {
    await weatherStore.retrieveWeatherData(route.query.lat, route.query.lng);
  } catch (error) {
    console.error(error);
  }
};
await retrieveWeatherData();

const unstoreCity = () => {
  const storedCities = JSON.parse(localStorage.getItem("storedCities"));
  const updatedCities = storedCities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("storedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};
</script>

<style lang="scss" scoped>
#container {
  @apply flex flex-col flex-1 items-center;
}

#banner {
  @apply w-full text-center text-white p-4 bg-weather-secondary;
}

#weather-overview {
  @apply py-12 flex flex-col items-center text-white;
}

h1 {
  @apply mb-2 text-4xl;
}

#date-time {
  @apply mb-12 text-sm capitalize;
}

#temperature {
  @apply mb-8 text-8xl;
}

#weather-details {
  @apply text-center;
}

#weather-icon {
  @apply h-auto w-[100%];
}

hr {
  @apply w-full border border-white border-opacity-10;
}

#hourly-weather-overview {
  @apply w-full py-12 max-w-screen-md;
}

h2 {
  @apply mb-4;
}

#hourly-weather {
  @apply gap-4 flex flex-col items-center;
}

#hour {
  @apply whitespace-nowrap;
}

#hourly-weather-icon {
  @apply h-auto w-[50px] object-cover;
}

#daily-weather-overview {
  @apply w-full max-w-screen-md py-12;
}

#daily-weather {
  @apply flex items-center;
}

#daily-weather-icon {
  @apply h-auto w-[50px] object-cover;
}

#daily-temperature {
  @apply flex flex-1 gap-2 justify-end;
}
.delete-btn-group {
  @apply py-12 flex justify-center;
}
</style>
