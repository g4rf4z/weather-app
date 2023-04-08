export const processWeatherData = (weatherData) => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const adjustTimestamp = (timestamp) =>
    timestamp * 1000 + timezoneOffset + 1000 * weatherData.timezone_offset;

  weatherData.currentTime = adjustTimestamp(weatherData.current.dt);
  weatherData.hourly = weatherData.hourly.slice(0, 24).map((hour) => ({
    ...hour,
    currentTime: adjustTimestamp(hour.dt),
  }));
  weatherData.daily = weatherData.daily.slice(0, 7);

  return weatherData;
};
