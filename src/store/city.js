import { defineStore } from "pinia";

export const useCityStore = defineStore({
  id: "cityStore",
  state: () => ({
    storedCities: [],
  }),
  actions: {
    // Update a city in local storage.
    async updateStoredCities() {
      const getCities = localStorage.getItem("storedCities"); // Get cities in the local storage.

      if (getCities) {
        return (this.storedCities = JSON.parse(getCities));
      }
    },

    // Add a city in local storage.
    async storeCity(cityLocation) {
      const foundCity = this.storedCities.some(
        (city) => city.id === cityLocation.id
      );

      if (foundCity) {
        console.log("La ville existe déjà dans vos favoris.");
      } else {
        this.storedCities.push(cityLocation);
        localStorage.setItem("storedCities", JSON.stringify(this.storedCities));
      }
    },

    // Remove a city from local storage.
    async unstoreCity(cityId) {
      this.storedCities = this.storedCities.filter(
        (city) => city.id !== cityId
      );
      localStorage.setItem("storedCities", JSON.stringify(this.storedCities));
    },
  },
});
