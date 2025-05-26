import theme from "@/assets/theme";
import { WheatherCardProps } from "@/assets/types";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { getPossibleCitiesCords, getWeatherByCoords } from "@/lib/weatherApi";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<WheatherCardProps[]>([]);

  const handleCityName = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearch = async (query: string) => {
    try {
      const locations = await getPossibleCitiesCords(query);

      // Get weather for all locations
      const weatherResults = await Promise.all(
        locations.map(async (item: any) => {
          const weather = await getWeatherByCoords(item.lat, item.lon);
          return {
            id: `${item.lat},${item.lon}`,
            city: `${item.name}, ${item.state ?? ""} ${item.country}`,
            temperature: Math.round(weather.main.temp),
            condition: weather.weather[0].main,
          };
        })
      );

      setSearchResults(weatherResults);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching weather for locations", error);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleCityName}
        onSearch={() => handleSearch(searchQuery)}
        placeholder="Search for a city..."
      />

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WeatherCard
              city={item.city}
              temperature={item.temperature}
              condition={item.condition}
              showSaveButton
            />
          )}
          contentContainerStyle={styles.listContent}
        />
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
  noResults: {
    textAlign: "center",
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.lg,
  },
  locationOption: {
    padding: 12,
    backgroundColor: theme.colors.cardBackground,
    marginBottom: 6,
    borderRadius: 8,
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
  },
  optionText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
  },
});
