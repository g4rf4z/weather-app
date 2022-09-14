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
        const foundWeatherData = await apiWrapper.get(apiRoute);
        let cleanWeatherData = foundWeatherData.data;
        const localOffset = new Date().getTimezoneOffset() * 60000;
        const utc = cleanWeatherData.current.dt * 1000 + localOffset;
        cleanWeatherData.currentTime =
          utc + 1000 * cleanWeatherData.timezone_offset;

        cleanWeatherData.hourly.forEach((hour) => {
          const utc = hour.dt * 1000 + localOffset;
          hour.currentTime = utc + 1000 * cleanWeatherData.timezone_offset;
        });

        cleanWeatherData.hourly = cleanWeatherData.hourly.splice(0, 24);
        cleanWeatherData.daily = cleanWeatherData.daily.splice(0, 7);

        return (this.weatherData = cleanWeatherData);
      } catch (err) {
        console.log("tata");
        console.log(err);
      }
    },
  },
});

export { useWeatherStore };
