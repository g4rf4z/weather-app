import { defineStore } from "pinia";
import { apiWrapper } from "@/services/api";
import { processWeatherData } from "@/utils/processWeatherData";

const useWeatherStore = defineStore({
  id: "weatherStore",
  state: () => ({
    weatherData: {},
  }),

  getters: {},

  actions: {
    async retrieveWeatherData(lat, lng) {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
      const apiRoute = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

      try {
        const weatherData = await apiWrapper.get(apiRoute);
        const processedWeatherData = processWeatherData(weatherData);
        this.weatherData = processedWeatherData;
        // console.log(this.weatherData);
        return this.weatherData;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { useWeatherStore };
