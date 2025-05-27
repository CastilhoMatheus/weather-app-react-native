import { WheatherCardProps } from '@/assets/types';
import { getSavedLocations } from '@/lib/storage';
import { getWeatherByCoords } from '@/lib/weatherApi';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export const useSavedLocations = (): [
  WheatherCardProps[],
  React.Dispatch<React.SetStateAction<WheatherCardProps[]>>
] => {
  const [locations, setLocations] = useState<WheatherCardProps[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchLocations = async () => {
        const saved = await getSavedLocations(); // returns: { name, lat, lon }

        const enriched = await Promise.all(
          saved.map(async (loc) => {
            const weather = await getWeatherByCoords(loc.lat, loc.lon);
            return {
              city: loc.name,
              lat: loc.lat,
              lon: loc.lon,
              temperature: Math.round(weather.main.temp),
              condition: weather.weather[0].main,
            };
          })
        );

        setLocations(enriched);
      };

      fetchLocations();
    }, [])
  );

  return [locations, setLocations];
};
