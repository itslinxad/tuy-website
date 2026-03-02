import { useState, useEffect } from "react";
import { getWeather } from "../services/weather/client";
import type { UseWeatherResult } from "../services/weather/types";

const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

/**
 * Hook to fetch and auto-refresh current weather for Tuy, Batangas.
 * Returns { weather, loading, error }.
 * Silently refreshes every 15 minutes.
 */
export function useWeather(): UseWeatherResult {
  const [weather, setWeather] = useState<UseWeatherResult["weather"]>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async (forceRefresh = false) => {
      try {
        const data = await getWeather(forceRefresh);
        if (!cancelled) {
          setWeather(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch weather");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    // Initial fetch (uses cache if available)
    fetchWeather();

    // Auto-refresh interval (force refresh to bypass cache)
    const interval = setInterval(() => fetchWeather(true), REFRESH_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return { weather, loading, error };
}
