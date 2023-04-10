import { defineStore } from "pinia";

export const useCityStore = defineStore({
  id: "cityStore",
  state: () => ({
    storedCities: [],
  }),
  actions: {
    async retrieveStoredCities() {
      const foundCities = localStorage.getItem("storedCities");
      const parsedCities = foundCities ? JSON.parse(foundCities) : [];
      return (this.storedCities = parsedCities);
    },

    async storeCity(cityLocation) {
      try {
        await this.retrieveStoredCities();
        this.storedCities.push(cityLocation);
        localStorage.setItem("storedCities", JSON.stringify(this.storedCities));
      } catch (error) {
        console.error(error);
      }
    },

    async unstoreCity(cityId) {
      try {
        const deletedCity = this.storedCities.filter((city) => city.id !== cityId);
        localStorage.setItem("storedCities", JSON.stringify(deletedCity));
        return (this.storedCities = deletedCity);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
