import { DailyForecast, RawForecastItem } from "@/assets/types";
import { format } from "date-fns";
import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.openWeatherApiKey;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCoords(lat: number, lon: number) {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
}

export async function getCoordsByCity(city: string) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch coordinates");
  const data = await res.json();
  if (data.length === 0) throw new Error("City not found");
  return { lat: data[0].lat, lon: data[0].lon };
}

export async function getFiveDaysForecast(
  lat: number,
  lon: number
): Promise<DailyForecast[]> {
  const res = await fetch(
    `${BASE_URL}/forecast/daily?lat=${lat}&lon=${lon}&cnt=${6}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("Failed to fetch coordinates");
  const data = await res.json();
  if (data.length === 0) throw new Error("City not found");

  const forecastData: DailyForecast[] = (data.list as RawForecastItem[]).map(
    (item) => {
      const date = new Date(item.dt * 1000);
      const day = format(date, "EEE");

      return {
        day,
        condition: item.weather[0].main,
        high: Math.round(item.temp.max),
        low: Math.round(item.temp.min),
      };
    }
  );
  return forecastData;
}

export async function getPossibleCitiesCords(city: string) {
  const limit = 5;
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${API_KEY}`
  );
  const data = await response.json();
  if (!data.length) throw new Error("City not found");
  return data.map((item: any, index: number) => ({
    id: `${item.lat},${item.lon}-${index}`,
    name: item.name,
    state: item.state,
    country: item.country,
    lat: item.lat,
    lon: item.lon,
  }));
}