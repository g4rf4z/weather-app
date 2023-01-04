import { defineStore } from 'pinia';
import { apiWrapper } from '@/services/api';
import { formatWeatherData } from '@/utils/formatWeatherData';

const useOpenWeatherStore = defineStore('openWeatherStore', {
  state: () => ({
    weatherData: null,

    loaders: {
      fetchWeatherData: false,
    },
  }),

  getters: {},

  actions: {
    // Fetch weather data from the Open Weather API.
    async fetchWeatherData(lat, lon) {
      const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
      const apiRoute = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      this.loaders['fetchWeatherData'] = true;
      try {
        const response = await apiWrapper.get(apiRoute);
        this.weatherData = formatWeatherData(response);
      } finally {
        this.loaders['fetchWeatherData'] = false;
      }
    },
  },
});

export { useOpenWeatherStore };
