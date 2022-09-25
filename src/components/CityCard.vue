<template>
  <div id="container">
    <div id="city-state">
      <h2 id="city">{{ city.city }}</h2>
      <h3 id="state">{{ city.state }}</h3>
    </div>
    <div id="temperature-overview">
      <p id="temperature">
        {{ Math.round(city.weather.main.temp) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          H:
          {{ Math.round(city.weather.main.temp_max) }}&deg;
        </span>
        <span class="text-xs">
          L:
          {{ Math.round(city.weather.main.temp_min) }}&deg;
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
#container {
  @apply py-6 px-3 flex rounded-md bg-weather-secondary shadow-md cursor-pointer;
}

#city-state {
  @apply flex flex-col flex-1;
}

#city {
  @apply text-3xl;
}

#temperature-overview {
  @apply flex flex-col gap-2;
}

#temperature {
  @apply text-3xl self-end;
}
</style>
