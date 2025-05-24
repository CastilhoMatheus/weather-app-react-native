import theme from "@/assets/theme";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import { getCoordsByCity, getWeatherByCoords } from "@/lib/weatherApi";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([
    { id: "1", city: "London", temperature: 58, condition: "Cloudy" },
    { id: "2", city: "Paris", temperature: 62, condition: "Partly Cloudy" },
  ]);

  const handleCityName = (query: string) => {
    setSearchQuery(query);
  };

  const handleSearch = async (query: string) => {
    try {
      const { lat, lon } = await getCoordsByCity(query);
      const weather = await getWeatherByCoords(lat, lon);
      const extractedData = {
        id: weather.id,
        city: weather.name,
        temperature: Math.round(weather.main.temp),
        condition: weather.weather[0].main,
      };
      setSearchResults([...searchResults, extractedData]);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching location", error);
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

      {searchResults.length > 0 ? (
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
      ) : (
        <Text style={styles.noResults}>No results found</Text>
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
});
