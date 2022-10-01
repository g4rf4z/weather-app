<template>
  <div id="container">
    <input
      v-model="searchQuery"
      @input="fetchSearchResults"
      type="text"
      placeholder="Search for a city"
    />
    <ul
      v-if="
        searchResults.length > 0 ||
        searchError ||
        (searchQuery.length > 0 && !searchError)
      "
    >
      <li v-if="searchError">Something went wrong, please try again.</li>
      <li
        v-for="(searchResult, index) in searchResults"
        @click="goToCity(searchResult)"
        :key="index"
        class="cursor-pointer"
      >
        <button>{{ searchResult.place_name }}</button>
      </li>
      <li
        v-if="
          searchQuery.length > 0 && searchResults.length < 1 && !searchError
        "
      >
        No result match with your query, try a different term.
      </li>
    </ul>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { useMainStore } from "@/store/main";

const mainStore = useMainStore();

const searchQuery = ref("");
const getResultsTimeout = ref(null);
const searchResults = ref([]);
const searchError = ref(false);

const goToCity = (resultData) => {
  const [city, state, country] = resultData.place_name.split(",");
  const [lng, lat] = resultData.geometry.coordinates;
  mainStore.citySearchResults = [];
  mainStore.city;
  router.push({
    name: "city",
    params: { city, state, country },
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
      searchResults.value = await mainStore.searchCity(searchQuery.value);
      searchError.value = false;
    } catch (error) {
      searchError.value = true;
    }
  }, 500);
};
</script>

<style lang="scss" scoped>
#container {
  @apply mb-8 pt-4 relative;
}

input {
  @apply w-full py-2 px-1 bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71];
}

ul {
  @apply w-full mt-2 text-white bg-weather-secondary shadow-md;
}

p {
  @apply py-2;
}

li {
  @apply py-2 px-1;
}
</style>
