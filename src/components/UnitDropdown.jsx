export const UnitDropdown = ({ units, onUnitsChange }) => {
  return (
    <div className="relative">
      <label htmlFor="unit-select" className="sr-only">
        Select Measurement Units
      </label>
      <select
        id="unit-select"
        value={units}
        onChange={(e) => onUnitsChange(e.target.value)}
        className="appearance-none bg-[var(--color-surface)] text-white font-medium py-3 px-6 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <option value="celsius">Metric (°C, km/h, mm)</option>
        <option value="fahrenheit">Imperial (°F, mph, in)</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}
