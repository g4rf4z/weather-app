<template>
  <main>
    <div id="input">
      <input
        v-model="searchQuery"
        @input="getSearchResult"
        type="text"
        placeholder="Search for a city"
      />
      <ul v-if="searchResult || searchError">
        <li v-if="searchError">Something went wrong, please try again.</li>
        <li
          v-for="result in searchResult"
          @click="previewCity(result)"
          :key="result.id"
        >
          {{ result.place_name }}
        </li>
        <li v-if="searchQuery.length > 0">
          No result match with your query, try a different term.
        </li>
      </ul>
    </div>
    <div>
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import { useMapStore } from "../store/map";

const savedCities = computed(() => localStorage.getItem("storedCity"));
const router = useRouter();
const mapStore = useMapStore();
await mapStore.fetchMapData();

const previewCity = (searchResult) => {
  const [city, state, country] = searchResult.place_name.split(",");
  router.push({
    name: "city",
    params: { city, state, country },
    query: {
      lng: searchResult.geometry.coordinates[0],
      lat: searchResult.geometry.coordinates[1],
      preview: true,
    },
  });
};

const searchQuery = ref("");
const queryDisplayTimeout = ref(null);
const searchResult = computed(() => mapStore.searchResult);
const searchError = computed(() => mapStore.searchError);

const getSearchResult = () => {
  clearTimeout(queryDisplayTimeout.value);
  queryDisplayTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      mapStore.fetchMapData(searchQuery.value);
    }
    mapStore.mapData = {};
  }, 300);
};
</script>

<style lang="scss" scoped>
main {
  @apply container text-white;
}

#input {
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
  @apply py-2 px-1 cursor-pointer;
}
</style>
