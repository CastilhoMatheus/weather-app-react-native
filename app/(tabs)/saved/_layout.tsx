import theme from '@/assets/theme';
import { Stack } from 'expo-router';

export default function SavedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTitleStyle: { fontWeight: 'bold', color: theme.colors.text },
        headerTintColor: theme.colors.primary,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Saved Locations' }} />
      <Stack.Screen
        name="[city]"
        options={({ route }) => ({
          title: route.params?.city || 'City Details',
        })}
      />
    </Stack>
  );
}
