<template>
  <div id="container">
    <!-- Banner -->
    <div id="banner" v-if="route.query.preview">
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city.
      </p>
    </div>

    <!-- Weather overview -->
    <div id="weather-overview">
      <h1>{{ route.params.city }}, {{ route.params.state }}</h1>
      <p id="date-time-display">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en", {
            timeStyle: "short",
          })
        }}
      </p>
      <p id="temperature-display">
        {{ Math.round(weatherData.current.temp) }}&deg;C
      </p>

      <!-- Details overview -->
      <div id="details-overview">
        <p>
          Description:
          {{ weatherData.current.weather[0].description }}
        </p>
        <p>
          Felt temperature:
          {{ Math.round(weatherData.current.feels_like) }}&deg;C
        </p>
        <p>
          Humidity level:
          {{ weatherData.current.humidity }}&percnt;
        </p>
        <img
          id="current-weather-icon"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt="Icon"
        />
      </div>
    </div>

    <hr />

    <!-- Hourly weather -->
    <div id="hourly-weather-overview">
      <div class="mx-8 text-white">
        <h2>Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            class="flex flex-col gap-4 items-center"
            v-for="weatherForecast in weatherData.hourly"
            :key="weatherForecast.dt"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(weatherForecast.currentTime).toLocaleTimeString("en", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${weatherForecast.weather[0].icon}@2x.png`"
              alt="Icon"
            />
            <p class="text-xl">{{ Math.round(weatherForecast.temp) }}&deg;C</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
    );

    // Call current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // Call hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();
console.log(weatherData);
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

#date-time-display {
  @apply mb-12 text-sm capitalize;
}

#temperature-display {
  @apply mb-8 text-8xl;
}

#details-overview {
  @apply text-center;
}

#current-weather-icon {
  @apply h-auto w-[100%];
}

hr {
  @apply w-full border border-white border-opacity-10;
}

#hourly-weather-overview {
  @apply w-full max-w-screen-md py-12;
}

h2 {
  @apply mb-4;
}
</style>
