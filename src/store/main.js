import { defineStore } from "pinia";
import { apiWrapper } from "@/services/api";

const useMainStore = defineStore({
  id: "mainStore",
  state: () => ({}),

  getters: {},

  actions: {
    async searchCity(query) {
      const apiKey = import.meta.env.VITE_MAPBOX_API_KEY;
      const apiRoute = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${apiKey}&types=place`;

      try {
        const foundCities = await apiWrapper.get(apiRoute);
        return foundCities.features.map((city) => {
          const { id, place_name, geometry } = city;
          console.log(city);
          return { id, place_name, geometry };
        });
      } catch (error) {
        console.error("An error occurred while retrieving city data.");
      }
    },
  },
});

export { useMainStore };
