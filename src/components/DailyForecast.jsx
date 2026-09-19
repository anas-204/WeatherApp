import { WeatherIcon } from '../utils/weatherIcons'

export const DailyForecast = ({ data }) => {
  return (
    <div className="bg-[var(--color-surface)] rounded-3xl p-6">
      <h2 className="text-lg font-medium text-gray-300 mb-6 m-0">7-Day Forecast</h2>
      <div className="space-y-4">
        {data.time.map((time, idx) => {
          // Parse date properly to avoid timezone shifts
          // The string is "YYYY-MM-DD". Using `new Date(time + "T00:00:00")` 
          // ensures it treats it as local time, or we can just parse the string parts.
          const [year, month, day] = time.split('-')
          const date = new Date(year, month - 1, day)
          
          const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })
          
          return (
            <div key={time} className="flex items-center justify-between p-2 hover:bg-[var(--color-surface-hover)] rounded-xl transition-colors">
              <span className="w-16 text-gray-400 font-medium">{dayName}</span>
              <div className="flex-1 flex justify-center">
                <WeatherIcon code={data.weather_code[idx]} />
              </div>
              <div className="w-24 flex justify-end gap-2 font-medium">
                <span>{Math.round(data.temperature_2m_max[idx])}°</span>
                <span className="text-gray-500">{Math.round(data.temperature_2m_min[idx])}°</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
