import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Search,
  MapPin
} from 'lucide-react'

// Simple helper to map Open-Meteo WMO weather codes to Lucide icons
const getWeatherIcon = (code) => {
  if (code === 0) return <Sun className="w-8 h-8 text-yellow-400" />
  if (code >= 1 && code <= 3) return <Cloud className="w-8 h-8 text-gray-400" />
  if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-blue-400" />
  if (code >= 71 && code <= 77) return <CloudSnow className="w-8 h-8 text-white" />
  if (code >= 95) return <CloudLightning className="w-8 h-8 text-purple-400" />
  return <Sun className="w-8 h-8 text-yellow-400" />
}

export default function App() {
  const [searchInput, setSearchInput] = useState("New York")
  const [city, setCity] = useState("New York")
  const [units, setUnits] = useState("celsius") // 'celsius' or 'fahrenheit'

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['weather', city, units],
    queryFn: async () => {
      // 1. Fetch geocoding
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
      const geoData = await geoRes.json()
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found")
      }
      
      const { latitude, longitude, name, country } = geoData.results[0]

      // 2. Fetch weather
      const tempUnit = units === 'celsius' ? 'celsius' : 'fahrenheit'
      const windUnit = units === 'celsius' ? 'kmh' : 'mph'
      const precipUnit = units === 'celsius' ? 'mm' : 'inch'
      
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}&precipitation_unit=${precipUnit}`
      
      const weatherRes = await fetch(weatherUrl)
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

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setCity(searchInput.trim())
    }
  }

  return (
    <div className="min-h-screen bg-[#111319] text-white p-4 md:p-8 font-sans">
      <main className="max-w-5xl mx-auto space-y-6">
        
        {/* Header / Search / Units */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search for a city..."
              className="w-full bg-[#1e212b] text-white rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          </form>

          <div className="flex bg-[#1e212b] rounded-full p-1">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${units === 'celsius' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setUnits('celsius')}
            >
              °C
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${units === 'fahrenheit' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setUnits('fahrenheit')}
            >
              °F
            </button>
          </div>
        </header>

        {isLoading && <div className="text-center py-20 text-gray-400">Fetching weather data...</div>}
        {isError && <div className="text-center py-20 text-red-400">Error: {error.message}</div>}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Current Weather & Forecast */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Current Weather Card */}
              <div className="bg-[#1e212b] rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center md:items-start">
                <div className="space-y-4 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 font-medium">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{data.location.name}, {data.location.country}</span>
                  </div>
                  <div className="text-6xl font-bold">
                    {Math.round(data.current.temperature_2m)}{data.units.temp}
                  </div>
                  <div className="text-gray-400">
                    Feels like {Math.round(data.current.apparent_temperature)}{data.units.temp}
                  </div>
                </div>
                <div className="mt-6 md:mt-0">
                  {getWeatherIcon(data.current.weather_code)}
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1e212b] rounded-2xl p-6 flex flex-col items-center justify-center gap-2">
                  <Wind className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400 text-sm">Wind</span>
                  <span className="font-bold">{data.current.wind_speed_10m} {data.units.wind}</span>
                </div>
                <div className="bg-[#1e212b] rounded-2xl p-6 flex flex-col items-center justify-center gap-2">
                  <Droplets className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400 text-sm">Humidity</span>
                  <span className="font-bold">{data.current.relative_humidity_2m}%</span>
                </div>
                <div className="bg-[#1e212b] rounded-2xl p-6 flex flex-col items-center justify-center gap-2">
                  <CloudRain className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400 text-sm">Precipitation</span>
                  <span className="font-bold">{data.current.precipitation} {data.units.precip}</span>
                </div>
                <div className="bg-[#1e212b] rounded-2xl p-6 flex flex-col items-center justify-center gap-2">
                  <Thermometer className="w-6 h-6 text-blue-400" />
                  <span className="text-gray-400 text-sm">Apparent</span>
                  <span className="font-bold">{Math.round(data.current.apparent_temperature)}{data.units.temp}</span>
                </div>
              </div>

              {/* Hourly Forecast */}
              <div className="bg-[#1e212b] rounded-3xl p-6">
                <h3 className="text-lg font-medium text-gray-300 mb-6">Today's Forecast</h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {/* Slice first 24 hours */}
                  {data.hourly.time.slice(0, 24).map((time, idx) => {
                    // Only show every 3 hours to not clutter
                    if (idx % 3 !== 0) return null;
                    const date = new Date(time)
                    const hour = date.getHours()
                    const ampm = hour >= 12 ? 'PM' : 'AM'
                    const displayHour = hour % 12 || 12
                    
                    return (
                      <div key={time} className="flex flex-col items-center justify-between bg-[#272a35] rounded-full px-4 py-6 min-w-[80px] gap-3">
                        <span className="text-sm text-gray-400">{`${displayHour} ${ampm}`}</span>
                        {getWeatherIcon(data.hourly.weather_code[idx])}
                        <span className="font-bold">{Math.round(data.hourly.temperature_2m[idx])}°</span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: 7-Day Forecast */}
            <div className="bg-[#1e212b] rounded-3xl p-6">
              <h3 className="text-lg font-medium text-gray-300 mb-6">7-Day Forecast</h3>
              <div className="space-y-4">
                {data.daily.time.map((time, idx) => {
                  const date = new Date(time)
                  const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })
                  
                  return (
                    <div key={time} className="flex items-center justify-between p-2 hover:bg-[#272a35] rounded-xl transition-colors">
                      <span className="w-16 text-gray-400 font-medium">{dayName}</span>
                      <div className="flex-1 flex justify-center">
                        {getWeatherIcon(data.daily.weather_code[idx])}
                      </div>
                      <div className="w-24 flex justify-end gap-2 font-medium">
                        <span>{Math.round(data.daily.temperature_2m_max[idx])}°</span>
                        <span className="text-gray-500">{Math.round(data.daily.temperature_2m_min[idx])}°</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  )
}
