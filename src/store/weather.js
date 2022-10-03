import { defineStore } from "pinia";
import { apiWrapper } from "@/services/api";

const useWeatherStore = defineStore({
  id: "weatherStore",
  state: () => ({
    weatherData: {},
  }),

  getters: {},

  actions: {
    async fetchWeatherData(lat, lng) {
      const apiKey = import.meta.env.VITE_APP_OPEN_WEATHER_API_KEY;
      const apiRoute = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${apiKey}&units=metric`;

      try {
        const dirtyWeatherData = await apiWrapper.get(apiRoute);
        const cleanWeatherData = dirtyWeatherData.data;

        const timezone = new Date().getTimezoneOffset() * 60000;
        const utc = cleanWeatherData.current.dt * 1000 + timezone;

        cleanWeatherData.currentTime =
          utc + 1000 * cleanWeatherData.timezone_offset;

        cleanWeatherData.hourly.forEach((hour) => {
          const utc = hour.dt * 1000 + timezone;
          hour.currentTime = utc + 1000 * cleanWeatherData.timezone_offset;
        });

        await new Promise((timeout) => setTimeout(timeout, 1000));

        cleanWeatherData.hourly = cleanWeatherData.hourly.splice(0, 24);
        cleanWeatherData.daily = cleanWeatherData.daily.splice(0, 7);

        return (this.weatherData = cleanWeatherData);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { useWeatherStore };
