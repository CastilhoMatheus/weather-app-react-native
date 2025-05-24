import theme from "@/assets/theme";
import { DailyForecast } from "@/assets/types";
import WeatherCard from "@/components/WeatherCard";
import { useWeather } from "@/hooks/useWeather";
import { getFiveDaysForecast } from "@/lib/weatherApi";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const forecastData = [
    { day: "Mon", condition: "Sunny", high: 78, low: 65 },
    { day: "Tue", condition: "Partly Cloudy", high: 76, low: 64 },
    { day: "Wed", condition: "Rain", high: 70, low: 62 },
    { day: "Thu", condition: "Cloudy", high: 72, low: 63 },
    { day: "Fri", condition: "Sunny", high: 80, low: 68 },
  ];

  const lat = -22.906847; // Example: Dublin
  const lon = -43.172897;

  const [weather] = useWeather(lat, lon);

  const onRefresh = () => {
    setRefreshing(true);
    // Fetch new weather data
    setTimeout(() => setRefreshing(false), 1000);
  };

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getFiveDaysForecast(lat, lon);
        data.shift(); // skips today

        setForecast(data);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error:", err.message);
        } else {
          console.error("Unknown error:", err);
        }
      }
    };
    fetchForecast();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Current Weather</Text>

      <WeatherCard
        city={weather?.name || "Not Found"}
        temperature={Math.round(weather?.main.temp || 0)}
        condition={weather?.weather[0].main || "undefined"}
        high={Math.round(weather?.main.temp_max || 0)}
        low={Math.round(weather?.main.temp_min || 0)}
      />

      <Text style={styles.subtitle}>5-Day Forecast</Text>

      <View style={styles.forecastContainer}>
        {forecast.map((item, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.condition}>{item.condition}</Text>
            <View style={styles.temps}>
              <Text style={styles.high}>{item.high}°</Text>
              <Text style={styles.low}>{item.low}°</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: "600",
    color: theme.colors.text,
    marginVertical: theme.spacing.md,
  },
  forecastContainer: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
  day: {
    width: 40,
    fontSize: theme.fontSize.md,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  condition: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    paddingHorizontal: theme.spacing.sm,
  },
  temps: {
    flexDirection: "row",
    width: 80,
    justifyContent: "space-between",
  },
  high: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  low: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
});
