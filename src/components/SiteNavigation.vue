<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }">
        <div>
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">WeatherApp</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          v-if="cityIsNotSaved && route.name === 'city'"
          @click="addCity"
        ></i>
      </div>
      <BaseModal :modalActive="modalActive" @close-modal="toggleModal"
        ><div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            WeatherApp lets you track current and future weather cities of your
            choice.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>Search for a city by typing its name in the search bar.</li>
            <li>
              Select a city from the results, it will take you to the current
              weather for your selection.
            </li>
            <li>
              Follow the city by clicking on the "+" icon at the top right. This
              will save the city to display later on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer want to follow a city, simply select the city in
            the home page. At the bottom of the page there will be an option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const route = useRoute();
const router = useRouter();
const params = ref(route.params);

const storedCity = ref([]);
const retrievedCity = computed(() => localStorage.getItem("storedCity"));

const cityIsNotSaved = computed(() => {
  const savedCities = JSON.parse(retrievedCity.value);
  if (!savedCities) return true;
  const foundCities = savedCities.filter(
    (foundCity) =>
      foundCity.city === route.params.city &&
      foundCity.state === route.params.state
  );
  if (foundCities.length > 0) return false;
  return true;
});

console.log(route);

const addCity = () => {
  if (retrievedCity.value) {
    storedCity.value = JSON.parse(retrievedCity.value);
  }

  const currentCity = {
    id: uid(),
    city: route.params.city,
    state: route.params.state,
    country: route.params.country,

    coordinates: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  storedCity.value.push(currentCity);
  localStorage.setItem("storedCity", JSON.stringify(storedCity.value));

  let query = Object.assign({}, route.query);

  delete query.preview;
  query.id = currentCity.id;
  router.replace({ query });
};
</script>

<style lang="scss">
header {
  @apply sticky top-0 bg-weather-primary shadow-lg;
}

nav {
  @apply container flex flex-col sm:flex-row items-center gap-4 text-white py-6;

  a div {
    @apply flex items-center gap-3;
  }
}
</style>
