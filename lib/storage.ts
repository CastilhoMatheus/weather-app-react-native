import { SavedLocation } from '@/assets/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_LOCATIONS_KEY = 'saved_locations';

export async function saveLocation(location: SavedLocation) {
  const current = await getSavedLocations();

  // Check for duplicates by coordinates
  const alreadySaved = current.some(
    (loc) => loc.lat === location.lat && loc.lon === location.lon
  );

  if (alreadySaved) {
    console.log('Location already saved:', location.name);
    return;
  }

  const updated = [...current, location];
  await AsyncStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(updated));
}

export async function getSavedLocations(): Promise<SavedLocation[]> {
  const data = await AsyncStorage.getItem(SAVED_LOCATIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function clearSavedLocations() {
  await AsyncStorage.removeItem(SAVED_LOCATIONS_KEY);
}

export const deleteLocation = async (name: string) => {
  const current = await getSavedLocations();
  const updated = current.filter((loc) => loc.name !== name);
  await AsyncStorage.setItem(SAVED_LOCATIONS_KEY, JSON.stringify(updated));
};
