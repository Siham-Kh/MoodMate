// src/components/WeatherWidget.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Platform  // Added Platform import
} from 'react-native';
import * as Location from 'expo-location';
import { fetchWeather } from '../services/weatherService';
import { COLORS, SPACING } from '../constants/theme';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      setLoading(true);
      // Get location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission is required');
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Fetch weather data
      const weatherData = await fetchWeather(latitude, longitude);
      setWeather(weatherData);
    } catch (err) {
      setError('Could not load weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);

  return (
    <View style={styles.container}>
      <View style={styles.mainInfo}>
        <Text style={styles.temperature}>{temp}°C</Text>
        <Text style={styles.description}>
          {weather.weather[0].description}
        </Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>
          Feels like {feelsLike}°C
        </Text>
        <Text style={styles.detailText}>
          Humidity: {weather.main.humidity}%
        </Text>
        <Text style={styles.detailText}>
          Wind: {weather.wind.speed} m/s
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    margin: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  mainInfo: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  description: {
    fontSize: 18,
    color: COLORS.textLight,
    textTransform: 'capitalize',
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  detailText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default WeatherWidget;