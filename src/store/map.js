import { defineStore } from "pinia";
import { apiWrapper } from "@/services/api";

const useMapStore = defineStore({
  id: "mapStore",
  state: () => ({}),

  getters: {},

  actions: {
    fetchMapData() {
      const previewCity = (searchResult) => {
        const [city, state] = searchResult.place_name.split(",");
        router.push({
          name: "city",
          params: { city: city, state: state },
          query: {
            lng: searchResult.geometry.coordinates[0],
            lat: searchResult.geometry.coordinates[1],
            preview: true,
          },
        });
      };

      const apiKey = import.meta.env.VITE_APP_MAPBOX_API_KEY;
      const apiRoute = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${apiKey}&types=place`;
      const searchQuery = ref("");
      const queryTimeout = ref(null);
      const searchResult = ref(null);
      const searchError = ref(null);

      const getSearchResult = () => {
        clearTimeout(queryTimeout.value);
        queryTimeout.value = setTimeout(async () => {
          if (searchQuery.value !== "") {
            try {
              const foundMapData = apiWrapper.get(apiRoute);
              searchResult.value = foundMapData.data.features;
            } catch {
              searchError.value = true;
            }
            return;
          }
          searchResult.value = null;
        }, 300);
      };
    },
  },
});

export { useMapStore };
