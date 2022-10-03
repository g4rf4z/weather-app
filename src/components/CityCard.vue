<template>
  <div id="city-card-container">
    <div id="city-overview">
      <h2 id="city-name">{{ city.city }}</h2>
      <h3 id="state-country-name">{{ city.state }}, {{ city.country }}</h3>
    </div>
    <div id="temperature-overview">
      <p id="current-temperature">
        {{ Math.round(city.weather.main.temp) }}&deg;
      </p>
      <div id="min-max-temperature">
        <span>
          Min:
          {{ Math.round(city.weather.main.temp_min) }}&deg;
        </span>
        <span>
          Max:
          {{ Math.round(city.weather.main.temp_max) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
#city-card-container {
  @apply py-6 px-3 flex rounded-md shadow-md bg-weather-secondary cursor-pointer;
}

#city-overview {
  @apply flex flex-col flex-1;
}

#city-name {
  @apply text-3xl;
}

#state-country-name {
  @apply mt-2;
}

#temperature-overview {
  @apply flex flex-col gap-2;
}

#current-temperature {
  @apply self-end text-3xl;
}

#min-max-temperature {
  @apply flex gap-2;
}
</style>
