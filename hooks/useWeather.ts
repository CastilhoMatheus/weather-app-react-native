import { WeatherApiResponse } from "@/assets/types";
import { getWeatherByCoords } from "@/lib/weatherApi";
import { useEffect, useState } from "react";

export const useWeather = (lat: number, lon: number) => {
  const [weather, setWeather] = useState<WeatherApiResponse>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weather = await getWeatherByCoords(lat, lon);
        setWeather(weather);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error:", err.message);
        } else {
          console.error("Unknown error:", err);
        }
      }
    };
    fetchWeather();
  }, [lat, lon]);

  return [weather];
};
