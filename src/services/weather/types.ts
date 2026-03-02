/**
 * Weather data types for Open-Meteo API integration
 * API docs: https://open-meteo.com/en/docs
 */

/** Raw response from Open-Meteo current weather endpoint */
export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    weather_code: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

/** Processed weather data used by the UI */
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  description: string;
  icon: string;
  updatedAt: string;
}

/** Shape stored in localStorage for caching */
export interface WeatherCache {
  data: WeatherData;
  timestamp: number;
}

/** Return type of the useWeather hook */
export interface UseWeatherResult {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}
