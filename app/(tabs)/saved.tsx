import theme from '@/assets/theme';
import WeatherCard from '@/components/WeatherCard';
import { useSavedLocations } from '@/hooks/useSavedLocations';
import { deleteLocation } from '@/lib/storage';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function SavedScreen() {
  const [locations, setLocations] = useSavedLocations();

  const handleDelete = async (name: string) => {
    await deleteLocation(name);
    setLocations((prev) => prev.filter((loc) => loc.city !== name));
  };

  return (
    <View style={styles.container}>
      {locations.length > 0 ? (
        <FlatList
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <WeatherCard
              city={item.city}
              temperature={item.temperature}
              condition={item.condition}
              showDeleteButton
              onPress={() => handleDelete(item.city)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noSaved}>
          No saved locations. Search for cities to save them.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  noSaved: {
    textAlign: "center",
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.lg,
  },
});
