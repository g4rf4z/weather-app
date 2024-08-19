<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a city"
      @input="fetchSearchResults" />
    <ul v-if="searchResults.length > 0 || searchError || (searchQuery.length > 0 && !searchError)">
      <li v-if="searchError">Something went wrong, please try again.</li>
      <li
        v-for="(searchResult, index) in searchResults"
        :key="index"
        class="cursor-pointer"
        @click="goToCityView(searchResult)">
        <button>{{ searchResult.place_name }}</button>
      </li>
      <li v-if="searchQuery.length > 0 && searchResults.length < 1 && !searchError">
        No result match with your query, try a different term.
      </li>
    </ul>
  </div>
</template>

<script setup>
import router from '@/router';

import { ref } from 'vue';
import { useMapboxStore } from '@/store/mapbox';

const mapboxStore = useMapboxStore();

const searchQuery = ref('');
const searchResults = ref([]);
const searchError = ref(false);
const getResultsTimeout = ref(null);

const goToCityView = (result) => {
  const { id, place_name, coordinates } = result;
  const [city, state, country] = place_name.split(',').map((item) => item.trim() || 'N/A');
  const [lng, lat] = coordinates;

  mapboxStore.citySearchResults = [];

  const params = { id, city };
  if (state) params.state = state;
  if (country) params.country = country;

  router.push({
    name: 'city',
    params: {
      id,
      city,
      state,
      country,
    },
    query: {
      lng,
      lat,
      preview: true,
    },
  });
};

const fetchSearchResults = async () => {
  clearTimeout(getResultsTimeout.value);
  getResultsTimeout.value = setTimeout(async () => {
    try {
      searchResults.value = await mapboxStore.fetchGeolocation(searchQuery.value);
      searchError.value = false;
    } catch (error) {
      searchError.value = true;
    }
  }, 500);
};
</script>

<style lang="scss" scoped>
.search-container {
  @apply my-10;

  input {
    @apply w-full px-2 border-b bg-transparent;
    @apply focus:outline-none focus:border-weather-secondary focus:shadow-[0px_1px#004E71];
  }

  ul {
    @apply w-full mt-2 text-white bg-weather-secondary shadow-xl;

    li {
      @apply px-2 py-2;
    }
  }
}
</style>
