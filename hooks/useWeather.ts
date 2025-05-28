import { WeatherApiResponse } from "@/assets/types";
import { getWeatherByCoords } from "@/lib/weatherApi";
import { useEffect, useState } from "react";

export const useWeather = (
  location: { coords: { latitude: number; longitude: number } } | null
) => {
  const [weather, setWeather] = useState<WeatherApiResponse | null>(null);
  const [extraInfo, setExtraInfo] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (
          location?.coords.latitude !== undefined &&
          location?.coords.longitude !== undefined
        ) {
          const weather = await getWeatherByCoords(
            location.coords.latitude,
            location.coords.longitude
          );
          setWeather(weather);

          const hints: string[] = [];

          // 🌞 UV Index
          if (weather.uvi !== undefined) {
            hints.push(
              weather.uvi >= 7
                ? `☀️ UV is high (${weather.uvi}). Use sunscreen!`
                : `☀️ UV Index is moderate (${weather.uvi}).`
            );
          }

          // 💧 Humidity
          const humidity = weather.main?.humidity;
          if (humidity !== undefined) {
            if (humidity > 70) {
              hints.push(`💧 Humidity is at ${humidity}%. Might feel sticky.`);
            } else if (humidity < 40) {
              hints.push(`💧 Low humidity (${humidity}%). Skin might feel dry.`);
            } else {
              hints.push(`💧 Humidity is comfortable at ${humidity}%.`);
            }
          }

          // 🌬 Wind
          const wind = weather.wind?.speed;
          if (wind !== undefined) {
            hints.push(
              `🌬 Winds at ${wind} km/h. ${
                wind < 10 ? "A calm day!" : "Might be a bit breezy."
              }`
            );
          }

          // 🧥 Outfit Suggestion
          const feels = weather.main?.feels_like ?? weather.main?.temp;
          if (feels !== undefined) {
            if (feels < 10) {
              hints.push(`🧥 Feels like ${Math.round(feels)}°C. Bundle up!`);
            } else if (feels < 18) {
              hints.push(
                `🧥 Feels like ${Math.round(feels)}°C. A light jacket works.`
              );
            } else {
              hints.push(`😎 Feels like ${Math.round(feels)}°C. Dress comfy!`);
            }
          }

          // 🕶 Sunrise / Sunset
          if (weather.sys?.sunrise && weather.sys?.sunset) {
            const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            hints.push(`🕶 Sunrise at ${sunrise} · Sunset at ${sunset}`);
          }

          setExtraInfo(hints);
        } else {
          console.error("Coordinates are undefined");
        }
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);
  return [weather, extraInfo] as const;
};
