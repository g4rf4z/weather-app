<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }">
        <div>
          <i id="logo" class="fa-solid fa-sun"></i>
          <h1 id="slogan">Weather App</h1>
        </div>
      </router-link>

      <div id="btn-group">
        <i @click="toggleModal" id="open-info-btn" class="fa-solid fa-circle-info"></i>
        <i v-if="storedCities && route.name === 'city'" @click="storeCity" id="add-city-btn" class="fa-solid fa-plus"></i>
      </div>

      <modal :modalActive="modalActive" @close-modal="toggleModal">
        <h2 class="info-titles">About:</h2>
        <p class="mb-4">WeatherApp allows you to track the current and future weather cities of your choice.</p>
        <h2 class="info-titles">How it works:</h2>
        <ol id="info-list">
          <li>Use the search bar to find a city.</li>
          <li>Select a city from the results, you will be redirected to its weather page.</li>
          <li>Add the city to your favorites by clicking on the "+" icon.</li>
        </ol>
        <h2 class="info-titles">Remove a city:</h2>
        <p>If you no longer want to follow a city, at the bottom of the page there is an option to delete it.</p>
      </modal>
    </nav>
  </header>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { RouterLink, useRoute } from "vue-router";
  import { uid } from "uid";
  import Modal from "./Modal.vue";

  const modalActive = ref(null);

  // Gère le statut de la modale.
  const toggleModal = () => {
    modalActive.value = !modalActive.value;
  };

  const route = useRoute();

  const storedCities = ref([]);
  const getCities = localStorage.getItem("storedCities");

  const cityIsNotSaved = computed(() => {
    const savedCities = JSON.parse(retrievedCity.value);
    if (!savedCities) return true;
    const foundCities = savedCities.filter(
      (foundCity) => foundCity.city === route.params.city && foundCity.state === route.params.state
    );
    if (foundCities.length > 0) return false;
    return true;
  });

  // Stocke une ville dans le local storage.
  const storeCity = () => {
    if (getCities) {
      storedCities.value = JSON.parse(getCities);
    }
    const cityLocation = {
      id: route.params.id,
      city: route.params.city,
      state: route.params.state,
      country: route.params.country,
      coordinates: {
        lat: route.query.lat,
        lng: route.query.lng,
      },
    };
    storedCities.value.push(cityLocation);
    localStorage.setItem("storedCities", JSON.stringify(storedCities.value));
  };
</script>

<style lang="scss">
  header {
    @apply sticky top-0 bg-weather-primary shadow-lg;
  }

  nav {
    @apply py-6 container flex flex-col sm:flex-row items-center gap-4 text-white;

    a div {
      @apply flex items-center gap-3;
    }
  }

  #logo,
  #slogan {
    @apply text-2xl;
  }

  #btn-group {
    @apply flex flex-1 justify-end gap-3;
  }

  #open-info-btn,
  #add-city-btn {
    @apply text-xl cursor-pointer hover:text-weather-secondary duration-150;
  }

  .info-titles {
    @apply text-2xl mb-1;
  }

  #info-list {
    @apply mb-4 list-decimal list-inside;
  }
</style>
