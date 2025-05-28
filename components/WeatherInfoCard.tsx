import theme from '@/assets/theme'; // adjust the import based on your actual theme path
import { StyleSheet, Text, View } from 'react-native';

interface WeatherInfoCardProps {
  info: string[];
}

const WeatherInfoCard = ({ info }: WeatherInfoCardProps) => {
  if (!info.length) return null;

  return (
    <View style={styles.card}>
      {info.map((line, index) => (
        <Text key={index} style={styles.infoText}>
          • {line}
        </Text>
      ))}
    </View>
  );
};

export default WeatherInfoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
});
