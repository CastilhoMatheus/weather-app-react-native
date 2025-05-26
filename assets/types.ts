export type WeatherApiResponse = {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
} | null;

export type WheatherCardProps = {
  id: string, 
  city: string;
  temperature: number;
  condition: string;
  high?: number;
  low?: number;
  showSaveButton?: boolean;
  showDeleteButton?: boolean;
};

export type DailyForecast = {
  day: string; // e.g. "Mon"
  condition: string; // e.g. "Sunny"
  high: number; // e.g. 78
  low: number; // e.g. 65
};

export type RawForecastItem = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};

