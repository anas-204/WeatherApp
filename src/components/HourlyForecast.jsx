import { useState } from 'react'
import { WeatherIcon } from '../utils/weatherIcons'

export const HourlyForecast = ({ hourlyData, dailyData }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0)

  // Hourly data contains 168 items (7 days * 24 hours)
  const startIndex = selectedDayIndex * 24
  const endIndex = startIndex + 24
  
  const selectedTimes = hourlyData.time.slice(startIndex, endIndex)
  const selectedTemps = hourlyData.temperature_2m.slice(startIndex, endIndex)
  const selectedCodes = hourlyData.weather_code.slice(startIndex, endIndex)

  return (
    <div className="bg-[var(--color-surface)] rounded-3xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg font-medium text-gray-300 m-0">Hourly Forecast</h2>
        
        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 max-w-full scrollbar-hide" role="group" aria-label="Select forecast day">
          {dailyData.time.map((time, idx) => {
            // Split the date string (YYYY-MM-DD) and create a local date to avoid UTC shifts
            const [year, month, day] = time.split('-')
            const date = new Date(year, month - 1, day)
            
            const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })
            const isSelected = selectedDayIndex === idx
            
            return (
              <button
                key={time}
                onClick={() => setSelectedDayIndex(idx)}
                aria-pressed={isSelected}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  isSelected 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[var(--color-surface-hover)] text-gray-400 hover:text-white'
                }`}
              >
                {dayName}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {selectedTimes.map((timeString, idx) => {
          // Only show every 3 hours to not clutter
          if (idx % 3 !== 0) return null;
          
          // Parse time from ISO string to ignore browser timezone
          // Format from API: "YYYY-MM-DDTHH:00"
          const hourPart = timeString.split('T')[1].split(':')[0]
          const hour = parseInt(hourPart, 10)
          
          const ampm = hour >= 12 ? 'PM' : 'AM'
          const displayHour = hour % 12 || 12
          
          return (
            <div key={timeString} className="flex flex-col items-center justify-between bg-[var(--color-surface-hover)] rounded-full px-4 py-6 min-w-[80px] gap-3">
              <span className="text-sm text-gray-400">{`${displayHour} ${ampm}`}</span>
              <WeatherIcon code={selectedCodes[idx]} />
              <span className="font-bold text-lg">{Math.round(selectedTemps[idx])}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
