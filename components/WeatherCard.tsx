import theme from "@/assets/theme";
import { WheatherCardProps } from "@/assets/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function WeatherCard({
  city,
  temperature,
  condition,
  high,
  low,
  showSaveButton,
  showDeleteButton,
  onPress
}: WheatherCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.city}>{city}</Text>
        {(showSaveButton || showDeleteButton) && (
          <TouchableOpacity onPress={onPress}>
            <Ionicons
              name={showSaveButton ? "bookmark-outline" : "trash-outline"}
              size={24}
              color={showSaveButton ? theme.colors.primary : theme.colors.error}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.weatherInfo}>
        <Text style={styles.temperature}>{temperature}°</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>

      {high !== undefined && low !== undefined && (
        <View style={styles.highLow}>
          <Text style={styles.highLowText}>H: {high}°</Text>
          <Text style={styles.highLowText}>L: {low}°</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },
  city: {
    fontSize: theme.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  temperature: {
    fontSize: theme.fontSize.xxl,
    fontWeight: "300",
    color: theme.colors.text,
  },
  condition: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
  },
  highLow: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  highLowText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
});
