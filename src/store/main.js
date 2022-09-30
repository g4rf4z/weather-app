import { defineStore } from "pinia";
import { apiWrapper } from "@/services/api";

const useMainStore = defineStore({
  id: "mainStore",
  state: () => ({
    cityData: {},
    storedCitiesData: [],
  }),

  getters: {},

  actions: {
    async searchCity(query) {
      if (!query) return
      const apiKey = import.meta.env.VITE_APP_MAPBOX_API_KEY
      const foundCities = await apiWrapper.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${apiKey}&types=place`)
      return foundCities.data.features.map(city => {
        const { id, place_name, geometry } = city
        return { id, place_name, geometry}
      })
    },

    async fetchCityWeatherData(lat, lng) {
      const apiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY
      const foundCityWeather = await apiWrapper.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${apiKey}&units=metric`)
      return foundCityWeather.data
    }
  }
});

export { useMainStore };
