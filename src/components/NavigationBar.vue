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
        <i
          v-if="route.name === 'city'"
          @click="storeCity"
          id="add-city-btn"
          class="fa-solid fa-plus"></i>
      </div>

      <modal :modalActive="modalActive" @close-modal="toggleModal">
        <h2 class="info-titles">About:</h2>
        <p class="mb-4">
          WeatherApp allows you to track the current and future weather cities of your choice.
        </p>
        <h2 class="info-titles">How it works:</h2>
        <ol id="info-list">
          <li>Use the search bar to find a city.</li>
          <li>Select a city from the results, you will be redirected to its weather page.</li>
          <li>Add the city to your favorites by clicking on the "+" icon.</li>
        </ol>
        <h2 class="info-titles">Remove a city:</h2>
        <p>
          If you no longer want to follow a city, at the bottom of the page there is an option to
          delete it.
        </p>
      </modal>
    </nav>
  </header>
</template>

<script setup>
import Modal from '@/components/Modal.vue';

import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { useCityStore } from '@/store/city';

const route = useRoute();

const cityStore = useCityStore();

const storeCity = async () => {
  try {
    const cityFeatures = {
      id: route.params.id,
      city: route.params.city,
      state: route.params.state,
      country: route.params.country,
      coordinates: {
        lat: route.query.lat,
        lng: route.query.lng,
      },
    };

    if (!cityStore.isCityStored(cityFeatures.id)) {
      cityStore.storeCity(cityFeatures);
    }
  } catch (error) {
    console.error(error);
  }
};

const modalActive = ref(false);

const toggleModal = () => {
  modalActive.value = !modalActive.value;
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
