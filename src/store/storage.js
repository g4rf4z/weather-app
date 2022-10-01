import { defineStore } from "pinia";
import { apiWrapper } from "@/services/api";

const useStorageStore = defineStore({
  id: "storageStore",
  state: () => ({
    storedCities: [],
    cities: [],
    apiKey: import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY,
    storageData: {},
  }),

  getters: {},

  actions: {
    async retrieveCity() {
      if (localStorage.getItem("storedCities")) {
        this.storedCities.value = JSON.parse(
          localStorage.getItem("storedCities")
        );
        parsedCities = this.storedCities.value;
        parsedCities.forEach((city) => {
          apiRoute = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates.lat}&lon=${city.coordinates.lng}&appid=${this.apiKey}&units=metric`;
          cities.push(apiWrapper.get(apiRoute));
        });
        weatherData = await Promise.all(this.cities);
        // await new Promise((timeout) => setTimeout(timeout, 1000));
        weatherData.forEach((value, index) => {
          this.storedCities.value[index].weather = value.data;
        });
      }
    },
  },
});

export { useStorageStore };
