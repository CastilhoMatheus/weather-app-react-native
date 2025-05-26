import { WeatherApiResponse } from "@/assets/types";
import { getWeatherByCoords } from "@/lib/weatherApi";
import { useEffect, useState } from "react";

export const useWeather = (location: { coords: { latitude: number; longitude: number } } | null) => {
  
  const [weather, setWeather] = useState<WeatherApiResponse>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (location?.coords.latitude !== undefined && location?.coords.longitude !== undefined) {
          const weather = await getWeatherByCoords(location.coords.latitude, location.coords.longitude);
          setWeather(weather);
        } else {
          console.error("Coordinates are undefined");
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error:", err.message);
        } else {
          console.error("Unknown error:", err);
        }
      }
    };
    if (location) {
      fetchWeather();
    }
  }, [location]);
  
  return [weather];
};
