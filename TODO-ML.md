Hyyy, I m Div

to run:
npm run dev

TODO: 
1. Weather API - COMPLETED ✅
   - Integrated Open-Meteo API for 7-day weather forecast (completely free, no API key required)
   - Created weather utility functions for fetching and formatting data
   - Updated dashboard to display real weather forecast data
   - Added loading states and error handling
   - Used Open-Meteo API instead of OpenWeatherMap to avoid credit card requirement
   - Implemented proper TypeScript types for weather data
   - Added UV index and precipitation data to weather forecast
   - Fixed all TypeScript compilation errors
   - Application running successfully on http://localhost:3003
   - Updated to use Chennai coordinates by default (13.0827° N, 80.2707° E)
   - Display all 7 days of weather forecast at once (removed next/prev navigation)
   - Optimized widget layout to minimize blank space
   - Enhanced weather widget to show detailed information:
     * Min/Max temperatures
     * Precipitation amounts (mm)
     * Wind speeds (km/h)
     * UV index values
     * Weather conditions with icons