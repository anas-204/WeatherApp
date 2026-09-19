import { MapPin, Wind, Droplets, CloudRain, Thermometer } from 'lucide-react'
import { WeatherIcon } from '../utils/weatherIcons'

export const CurrentWeather = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-surface)] rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 font-medium">
            <MapPin className="w-5 h-5" aria-hidden="true" />
            <h2 className="text-lg m-0 p-0 font-medium">
              {data.location.name}, {data.location.country}
            </h2>
          </div>
          <div className="text-6xl font-bold">
            {Math.round(data.current.temperature_2m)}
            <span aria-hidden="true">{data.units.temp}</span>
            <span className="sr-only"> degrees {data.units.temp}</span>
          </div>
          <div className="text-gray-400">
            Feels like {Math.round(data.current.apparent_temperature)}{data.units.temp}
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <WeatherIcon code={data.current.weather_code} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          icon={<Wind className="w-6 h-6 text-blue-400" aria-hidden="true" />}
          label="Wind"
          value={`${data.current.wind_speed_10m} ${data.units.wind}`}
        />
        <MetricCard 
          icon={<Droplets className="w-6 h-6 text-blue-400" aria-hidden="true" />}
          label="Humidity"
          value={`${data.current.relative_humidity_2m}%`}
        />
        <MetricCard 
          icon={<CloudRain className="w-6 h-6 text-blue-400" aria-hidden="true" />}
          label="Precipitation"
          value={`${data.current.precipitation} ${data.units.precip}`}
        />
        <MetricCard 
          icon={<Thermometer className="w-6 h-6 text-blue-400" aria-hidden="true" />}
          label="Apparent"
          value={`${Math.round(data.current.apparent_temperature)}${data.units.temp}`}
        />
      </div>
    </div>
  )
}

const MetricCard = ({ icon, label, value }) => (
  <div className="bg-[var(--color-surface)] rounded-2xl p-6 flex flex-col items-center justify-center gap-2">
    {icon}
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
)
