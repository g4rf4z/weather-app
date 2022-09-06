<template>
  <main>
    <div id="input">
      <input
        v-model="searchQuery"
        @input="getSearchResult"
        type="text"
        placeholder="Search for a city"
      />
      <ul v-if="searchResult">
        <p v-if="searchError">Something went wrong, please try again.</p>
        <p v-if="!searchError && searchResult.length === 0">
          No result match with your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in searchResult"
            @click="previewCity(searchResult)"
            :key="searchResult.id"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  router.push({
    name: "city",
    params: { city: city, state: state.replaceAll(" ", "") },
    query: {
      lng: searchResult.geometry.coordinates[0],
      lat: searchResult.geometry.coordinates[1],
      preview: true,
    },
  });
};

const apiKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";

const searchQuery = ref("");
const timeoutQuery = ref(null);
const searchResult = ref(null);
const searchError = ref(null);
const getSearchResult = () => {
  clearTimeout(timeoutQuery.value);
  timeoutQuery.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${apiKey}&types=place`
        );
        searchResult.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResult.value = null;
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
  @apply w-full py-2 px-1 absolute top-[64px] text-white bg-weather-secondary shadow-md;
}

p {
  @apply py-2;
}

li {
  @apply py-2 cursor-pointer;
}
</style>
