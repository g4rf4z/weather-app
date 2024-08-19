import { defineStore } from 'pinia';

export const useCityStore = defineStore('city', {
  state: () => ({
    // Fetch "cities" from localStorage.
    cities: JSON.parse(localStorage.getItem('cities') || '[]'),

    loaders: {
      saveCities: false,
      storeCity: false,
      unstoreCity: false,
    },
  }),

  getters: {
    // Check whether the city is stored in localStorage.
    isCityStored: (state) => (cityId) => state.cities.some((city) => city.id === cityId),
  },

  actions: {
    // Save "cities" to localStorage.
    saveCities() {
      this.loaders['saveCities'] = true;
      try {
        localStorage.setItem('cities', JSON.stringify(this.cities));
      } finally {
        this.loaders['saveCities'] = false;
      }
    },

    // Add a city to "cities" and update localStorage.
    storeCity(cityFeatures) {
      this.loaders['storeCity'] = true;
      try {
        this.cities.push(cityFeatures);
        this.saveCities();
      } finally {
        this.loaders['storeCity'] = false;
      }
    },

    // Remove a city from "cities" and update localStorage.
    unstoreCity(cityId) {
      this.loaders['unstoreCity'] = true;
      try {
        this.cities = this.cities.filter((city) => city.id !== cityId);
        this.saveCities();
      } finally {
        this.loaders['unstoreCity'] = false;
      }
    },
  },
});
