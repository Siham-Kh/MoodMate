// src/components/WeatherWidget.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
      setError(null);
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission is required');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const weatherData = await fetchWeather(latitude, longitude);
      
      if (weatherData && weatherData.main) {
        setWeather(weatherData);
      } else {
        setError('Invalid weather data received');
      }
    } catch (err) {
      console.error('Weather loading error:', err);
      setError('Could not load weather data');
    } finally {
      setLoading(false);
    }
  };

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const weatherIcons = {
      'Clear': 'sunny',
      'Clouds': 'cloud',
      'Rain': 'rainy',
      'Snow': 'snow',
      'Thunderstorm': 'thunderstorm',
      'Drizzle': 'water',
      'Mist': 'water-outline',
      'default': 'partly-sunny'
    };
    return weatherIcons[condition] || weatherIcons.default;
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={COLORS.primary} />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (!weather || !weather.main) {
      return <Text style={styles.errorText}>No weather data available</Text>;
    }

    const temp = Math.round(weather.main.temp);
    const feelsLike = Math.round(weather.main.feels_like);
    const mainWeather = weather.weather[0]?.main || 'Clear';

    return (
      <>
        <View style={styles.mainInfo}>
          <View style={styles.temperatureContainer}>
            <Ionicons 
              name={getWeatherIcon(mainWeather)} 
              size={40} 
              color={COLORS.primary} 
            />
            <Text style={styles.temperature}>{temp}°C</Text>
          </View>
          <Text style={styles.description}>
            {weather.weather[0]?.description || 'Unknown'}
          </Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="thermometer" size={20} color={COLORS.textLight} />
            <Text style={styles.detailText}>
              Feels like {feelsLike}°C
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="water" size={20} color={COLORS.textLight} />
            <Text style={styles.detailText}>
              Humidity: {weather.main.humidity}%
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="leaf" size={20} color={COLORS.textLight} />
            <Text style={styles.detailText}>
              Wind: {weather.wind?.speed || 0} m/s
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    margin: SPACING.md,
    minHeight: 150,
    justifyContent: 'center',
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
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
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
    marginTop: SPACING.sm,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  detailText: {
    fontSize: 16,
    color: COLORS.text,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: SPACING.md,
  },
});

export default WeatherWidget;