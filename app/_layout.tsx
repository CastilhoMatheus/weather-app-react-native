import theme from "@/assets/theme";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Slot />
    </View>
  );
}
