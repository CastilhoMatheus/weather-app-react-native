import theme from "@/assets/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSearch: (query: string) => void;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  onSearch,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={theme.colors.textSecondary}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        onSubmitEditing={() => onSearch(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  icon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 40,
    color: theme.colors.text,
  },
});
