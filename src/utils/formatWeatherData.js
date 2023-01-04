export const formatWeatherData = (weatherData) => {
  // Convert Unix timestamp to milliseconds.
  const timestamp = weatherData.dt * 1000;

  // Create a UTC date object.
  const utc = new Date(timestamp);

  // Set local city time.
  const localTime = new Date(utc.getTime() + weatherData.timezone * 1000);

  // Format date and hour.
  const localDateTime = localTime.toLocaleString('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'UTC' /* Use UTC to avoid automatic browser adjustments based on location. */,
  });

  // Add the localDateTime field to fetched weather data.
  weatherData.localDateTime = localDateTime;
  return weatherData;
};
