<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }">
        <div>
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">WeitherApp</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          v-if="route.query.preview"
          @click="addCity"
        ></i>
      </div>
      <BaseModal :modalActive="modalActive" @close-modal="toggleModal"
        ><div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";
import { uid } from "uid";

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

// _________________________ Add a city to the local storage
const route = useRoute();

const router = useRouter();

const storeCity = ref([]);

const retrieveCity = localStorage.getItem(storeCity);

const parseCity = JSON.parse(localStorage.getItem(storeCity));

const addCity = () => {
  if (retrieveCity) {
    storeCity.value = parseCity;
  }

  // Create a city object
  const cityObj = {
    id: uid(),
    city: route.params.city,
    state: route.params.state,

    Coordinates: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  // Push data into the local storage
  storeCity.value.push(cityObj);
  localStorage.setItem(storeCity, JSON.stringify(storeCity.value));

  // Delete the banner, plus icon and link preview
  let query = Object.assign({}, route.query);

  delete query.preview;
  router.replace({ query });
};
// ___________________________________________________________________________
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
