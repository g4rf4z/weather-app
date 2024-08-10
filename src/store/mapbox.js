import { defineStore } from 'pinia';
import { apiWrapper } from '@/services/api';

const useMapboxStore = defineStore('mapboxStore', {
  state: () => ({
    loaders: {
      fetchLocationData: false,
    },
  }),

  getters: {},

  actions: {
    async fetchLocationData(query) {
      const apiKey = import.meta.env.VITE_MAPBOX_API_KEY;
      const apiRoute = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${apiKey}&types=place`;

      this.loaders['fetchLocationData'] = true;
      try {
        const { features } = await apiWrapper.get(apiRoute);
        return features.map(
          ({ id, place_name, geometry: { coordinates } }) => ({
            id,
            place_name,
            coordinates,
          })
        );
      } finally {
        this.loaders['fetchLocationData'] = false;
      }
    },
  },
});

export { useMapboxStore };
