import {
  Cloud,
  Sun,
  CloudRain,
  CloudLightning,
  CloudSnow
} from 'lucide-react'

// Simple helper to map Open-Meteo WMO weather codes to Lucide icons and SR labels
export const getWeatherInfo = (code) => {
  if (code === 0) return { icon: <Sun className="w-8 h-8 text-yellow-400" aria-hidden="true" />, label: "Sunny" }
  if (code >= 1 && code <= 3) return { icon: <Cloud className="w-8 h-8 text-gray-400" aria-hidden="true" />, label: "Cloudy" }
  if (code >= 51 && code <= 67) return { icon: <CloudRain className="w-8 h-8 text-blue-400" aria-hidden="true" />, label: "Rainy" }
  if (code >= 71 && code <= 77) return { icon: <CloudSnow className="w-8 h-8 text-white" aria-hidden="true" />, label: "Snowy" }
  if (code >= 95) return { icon: <CloudLightning className="w-8 h-8 text-purple-400" aria-hidden="true" />, label: "Stormy" }
  return { icon: <Sun className="w-8 h-8 text-yellow-400" aria-hidden="true" />, label: "Clear" }
}

export const WeatherIcon = ({ code }) => {
  const { icon, label } = getWeatherInfo(code)
  return (
    <div className="inline-flex items-center justify-center">
      <span className="sr-only">{label}</span>
      {icon}
    </div>
  )
}
