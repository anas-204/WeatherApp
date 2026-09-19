# 🌤️ Modern Weather Dashboard

A sleek, responsive, and modern weather dashboard application built with **React**, **Vite**, and **Tailwind CSS**. It provides real-time weather conditions, 7-day forecasts, and hourly temperature breakdowns for any city in the world.

### 🚀 Live Demo
**[View Live on Vercel](https://weatherapp-lilac-one.vercel.app/)**

---

## ✨ Features

- **Real-Time Search**: Quickly search for any city globally using the built-in geocoding integration.
- **Current Conditions**: View current temperature, "feels like" temperature, wind speed, humidity, and precipitation.
- **Hourly Forecast**: A swipeable horizontal layout showing the temperature forecast for the next 24 hours.
- **7-Day Forecast**: A comprehensive daily breakdown of maximum and minimum temperatures alongside expected weather conditions.
- **Unit Toggling**: Seamlessly switch between Metric (°C, km/h, mm) and Imperial (°F, mph, in) units with immediate data updates.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing experiences using Tailwind CSS grid and flexbox.

## 🛠️ Technology Stack

- **Frontend Framework**: [React 19](https://react.dev/) via [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Fetching & State**: [TanStack React Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
- **APIs Used**: 
  - [Open-Meteo Weather API](https://open-meteo.com/en/docs)
  - [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

## 💡 My Process

### What I Learned
During this project, I deepened my understanding of React architecture and API integration. A few major highlights include:
1. **Separation of Concerns**: Breaking down a monolithic `App.jsx` into smaller, manageable components (like `SearchBar`, `CurrentWeather`, and `HourlyForecast`) significantly improved readability.
2. **Accessible APIs**: Incorporating screen-reader-only labels and ARIA live regions ensured that non-visual users still get a rich, real-time experience when searching or toggling units.
3. **Timezone Pitfalls**: Relying on native `Date` constructors for arbitrary ISO strings from an API can result in unexpected browser-local timezone shifts. Extracting raw date parts directly provided a much safer method for displaying forecasts globally.

### Future Enhancements
- Incorporate HTML5 Geolocation to automatically load the user's local weather upon visiting the app.
- Expand the 7-day forecast to be clickable, allowing users to drill down into deeper analytics for future days.

## 💻 Getting Started

To run this project locally on your machine:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anas-204/WeatherApp.git
   cd WeatherApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173/` to view the app!

## 📜 Acknowledgments

- Design and challenge concept originally inspired by [Frontend Mentor](https://www.frontendmentor.io/).
- Weather data provided entirely free and without API keys by Open-Meteo.
