import { useState } from 'react'
import { useWeather } from './hooks/useWeather'
import { SearchBar } from './components/SearchBar'
import { UnitDropdown } from './components/UnitDropdown'
import { CurrentWeather } from './components/CurrentWeather'
import { HourlyForecast } from './components/HourlyForecast'
import { DailyForecast } from './components/DailyForecast'

export default function App() {
  const [city, setCity] = useState("New York")
  const [units, setUnits] = useState("celsius") // 'celsius' or 'fahrenheit'

  const { data, isLoading, isError, error } = useWeather(city, units)

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-white p-4 md:p-8 font-sans">
      <main className="max-w-5xl mx-auto space-y-6">
        
        {/* Header / Search / Units */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="sr-only">Weather Dashboard</h1>
          <SearchBar initialCity={city} onSearch={setCity} />
          <UnitDropdown units={units} onUnitsChange={setUnits} />
        </header>

        {/* ARIA Live Regions for loading/error states */}
        <div aria-live="polite" role="status" className="sr-only">
          {isLoading ? "Fetching weather data..." : data ? `Showing weather for ${data.location.name} in ${units}` : ""}
        </div>
        <div aria-live="assertive" role="alert" className="sr-only">
          {isError ? `Error: ${error.message}` : ""}
        </div>

        {/* Visible Loading / Error */}
        {isLoading && <div className="text-center py-20 text-gray-400" aria-hidden="true">Fetching weather data...</div>}
        {isError && <div className="text-center py-20 text-red-400" aria-hidden="true">Error: {error.message}</div>}

        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Current Weather & Forecast */}
            <div className="lg:col-span-2 space-y-6">
              <CurrentWeather data={data} />
              <HourlyForecast hourlyData={data.hourly} dailyData={data.daily} />
            </div>

            {/* Right Column: 7-Day Forecast */}
            <div className="lg:col-span-1">
              <DailyForecast data={data.daily} />
            </div>

          </div>
        )}
      </main>
    </div>
  )
}
