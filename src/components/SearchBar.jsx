import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

export const SearchBar = ({ initialCity, onSearch }) => {
  const [input, setInput] = useState(initialCity)

  useEffect(() => {
    setInput(initialCity)
  }, [initialCity])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full md:w-96">
      <label htmlFor="city-search" className="sr-only">
        Search for a city
      </label>
      <input 
        id="city-search"
        type="text" 
        placeholder="Search for a city, e.g., New York"
        className="w-full bg-[var(--color-surface)] text-white rounded-full py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" aria-hidden="true" />
    </form>
  )
}
