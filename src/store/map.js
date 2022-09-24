import { defineStore } from "pinia";
import { apiWrapper } from "@/services/api";

const useMapStore = defineStore({
  id: "mapStore",
  state: () => ({
    apiKey: import.meta.env.VITE_APP_MAPBOX_API_KEY,
    searchError: null,
    mapData: {},
  }),

  getters: {
    searchResult: (state) => state.mapData.features,
  },

  actions: {
    async fetchMapData(searchQuery) {
      try {
        const foundMapData = await apiWrapper.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${this.apiKey}&types=place`
        );
        this.mapData = foundMapData.data;
      } catch {
        this.searchError = true;
      }
    },
  },
});

export { useMapStore };
