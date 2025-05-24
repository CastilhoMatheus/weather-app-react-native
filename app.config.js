import 'dotenv/config';

export default {
  expo: {
    name: 'weather-app-v2',
    slug: 'weather-app-v2',
    version: '2.0.0',
    extra: {
      openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
    },
    // Add anything else you need like icon, splash, etc.
  },
};
