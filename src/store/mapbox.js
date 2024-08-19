import { defineStore } from 'pinia';
import { apiWrapper } from '@/services/api';

const useMapboxStore = defineStore('mapboxStore', {
  state: () => ({
    loaders: {
      fetchGeolocation: false,
    },
  }),

  getters: {},

  actions: {
    // Fetch city geolocation data from the Mapbox API.
    async fetchGeolocation(query) {
      const apiKey = import.meta.env.VITE_MAPBOX_API_KEY;
      const apiRoute = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${apiKey}&types=place`;

      this.loaders['fetchGeolocation'] = true;
      try {
        const { features } = await apiWrapper.get(apiRoute);
        return features.map(({ geometry: { coordinates }, id, place_name }) => ({ coordinates, id, place_name }));
      } finally {
        this.loaders['fetchGeolocation'] = false;
      }
    },
  },
});

export { useMapboxStore };
