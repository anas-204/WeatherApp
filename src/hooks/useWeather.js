import { useQuery } from '@tanstack/react-query'

export const useWeather = (city, units) => {
  return useQuery({
    queryKey: ['weather', city, units],
    queryFn: async () => {
      // 1. Fetch geocoding safely
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      const geoRes = await fetch(geoUrl)
      
      if (!geoRes.ok) {
        throw new Error("Failed to reach geocoding service")
      }

      const geoData = await geoRes.json()
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found")
      }
      
      const { latitude, longitude, name, country } = geoData.results[0]

      // 2. Fetch weather safely
      const tempUnit = units === 'celsius' ? 'celsius' : 'fahrenheit'
      const windUnit = units === 'celsius' ? 'kmh' : 'mph'
      const precipUnit = units === 'celsius' ? 'mm' : 'inch'
      
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipUnit}`
      
      const weatherRes = await fetch(weatherUrl)
      
      if (!weatherRes.ok) {
        throw new Error("Failed to fetch weather data")
      }

      const weatherData = await weatherRes.json()

      return {
        location: { name, country },
        current: weatherData.current,
        daily: weatherData.daily,
        hourly: weatherData.hourly,
        units: {
          temp: weatherData.current_units.temperature_2m,
          wind: weatherData.current_units.wind_speed_10m,
          precip: weatherData.current_units.precipitation
        }
      }
    },
    enabled: !!city
  })
}
