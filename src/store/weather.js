import { defineStore } from 'pinia';
import { apiWrapper } from '@/services/api';

const useWeatherStore = defineStore({
  id: 'weatherStore',
  state: () => ({
    weatherData: {},
  }),

  getters: {},

  actions: {
    async retrieveWeatherData(lat, lon) {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
      const apiRoute = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      try {
        const weatherData = await apiWrapper.get(apiRoute);
        this.weatherData = weatherData;
        return { weatherData };
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export { useWeatherStore };
