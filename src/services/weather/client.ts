/**
 * Weather service client for Open-Meteo API
 * Fetches current weather for Tuy, Batangas (14.0191°N, 120.7302°E)
 * No API key required.
 *
 * API docs: https://open-meteo.com/en/docs
 */

import type { OpenMeteoResponse, WeatherData, WeatherCache } from "./types";

// Tuy, Batangas coordinates (Municipal Hall)
const TUY_LAT = 14.0191;
const TUY_LNG = 120.7302;

const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${TUY_LAT}&longitude=${TUY_LNG}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia%2FManila`;

const CACHE_KEY = "tuy_weather_cache";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

/**
 * WMO Weather interpretation codes (WW)
 * Maps numeric codes to human-readable descriptions and Font Awesome icons.
 * Reference: https://open-meteo.com/en/docs#weathervariables
 */
const WMO_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: "Clear Sky", icon: "fa-sun" },
  1: { description: "Mainly Clear", icon: "fa-sun" },
  2: { description: "Partly Cloudy", icon: "fa-cloud-sun" },
  3: { description: "Overcast", icon: "fa-cloud" },
  45: { description: "Foggy", icon: "fa-smog" },
  48: { description: "Depositing Rime Fog", icon: "fa-smog" },
  51: { description: "Light Drizzle", icon: "fa-cloud-rain" },
  53: { description: "Moderate Drizzle", icon: "fa-cloud-rain" },
  55: { description: "Dense Drizzle", icon: "fa-cloud-showers-heavy" },
  56: { description: "Light Freezing Drizzle", icon: "fa-cloud-rain" },
  57: { description: "Dense Freezing Drizzle", icon: "fa-cloud-showers-heavy" },
  61: { description: "Slight Rain", icon: "fa-cloud-rain" },
  63: { description: "Moderate Rain", icon: "fa-cloud-showers-heavy" },
  65: { description: "Heavy Rain", icon: "fa-cloud-showers-heavy" },
  66: { description: "Light Freezing Rain", icon: "fa-cloud-rain" },
  67: { description: "Heavy Freezing Rain", icon: "fa-cloud-showers-heavy" },
  71: { description: "Slight Snowfall", icon: "fa-snowflake" },
  73: { description: "Moderate Snowfall", icon: "fa-snowflake" },
  75: { description: "Heavy Snowfall", icon: "fa-snowflake" },
  77: { description: "Snow Grains", icon: "fa-snowflake" },
  80: { description: "Slight Rain Showers", icon: "fa-cloud-sun-rain" },
  81: { description: "Moderate Rain Showers", icon: "fa-cloud-showers-heavy" },
  82: { description: "Violent Rain Showers", icon: "fa-cloud-showers-heavy" },
  85: { description: "Slight Snow Showers", icon: "fa-snowflake" },
  86: { description: "Heavy Snow Showers", icon: "fa-snowflake" },
  95: { description: "Thunderstorm", icon: "fa-bolt" },
  96: { description: "Thunderstorm with Slight Hail", icon: "fa-bolt" },
  99: { description: "Thunderstorm with Heavy Hail", icon: "fa-bolt" },
};

/**
 * Get weather description and icon from WMO code
 */
function resolveWeatherCode(code: number): { description: string; icon: string } {
  return WMO_CODES[code] ?? { description: "Unknown", icon: "fa-question" };
}

// ── Cache helpers ──────────────────────────────────────────────

function isCacheValid(): boolean {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    const cache: WeatherCache = JSON.parse(raw);
    return Date.now() - cache.timestamp < CACHE_DURATION;
  } catch {
    return false;
  }
}

function getCachedWeather(): WeatherData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cache: WeatherCache = JSON.parse(raw);
    return cache.data;
  } catch {
    return null;
  }
}

function setCachedWeather(data: WeatherData): void {
  try {
    const cache: WeatherCache = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded)
  }
}

// ── Main fetch function ────────────────────────────────────────

/**
 * Fetch current weather for Tuy, Batangas.
 * Returns cached data if available and fresh; otherwise hits the API.
 */
export async function getWeather(forceRefresh = false): Promise<WeatherData> {
  // Return cache if valid and not forcing refresh
  if (!forceRefresh && isCacheValid()) {
    const cached = getCachedWeather();
    if (cached) return cached;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  const raw: OpenMeteoResponse = await response.json();
  const { description, icon } = resolveWeatherCode(raw.current.weather_code);

  const weather: WeatherData = {
    temperature: Math.round(raw.current.temperature_2m),
    humidity: raw.current.relative_humidity_2m,
    windSpeed: Math.round(raw.current.wind_speed_10m),
    weatherCode: raw.current.weather_code,
    description,
    icon,
    updatedAt: raw.current.time,
  };

  setCachedWeather(weather);
  return weather;
}
