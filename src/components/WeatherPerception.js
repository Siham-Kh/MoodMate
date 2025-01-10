// src/components/WeatherPerception.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';
import WeatherSelector from './WeatherSelector';

const WeatherPerception = ({ 
  currentWeather,  // fetched weather
  onWeatherSelect,
  loading,
  error 
}) => {
  const [showSelector, setShowSelector] = useState(false);
  const [perceptionType, setPerceptionType] = useState('same'); // 'same', 'indoor', 'different'

  const handlePerceptionSelect = (type) => {
    setPerceptionType(type);
    if (type === 'same') {
      // Convert OpenWeatherMap data to our weather format
      const weatherType = mapWeatherToType(currentWeather.weather[0].main);
      onWeatherSelect(weatherType);
      setShowSelector(false);
    } else {
      setShowSelector(true);
    }
  };

  // Map OpenWeatherMap conditions to our weather types
  const mapWeatherToType = (condition) => {
    const weatherMapping = {
      'Clear': { id: 'sunny', emoji: '☀️', label: 'Sunny' },
      'Clouds': { id: 'cloudy', emoji: '☁️', label: 'Cloudy' },
      'Rain': { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
      // Add more mappings as needed
    };
    return weatherMapping[condition] || weatherMapping['Clear'];
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error || !currentWeather) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Couldn't load weather data</Text>
        <WeatherSelector selected={null} onSelect={onWeatherSelect} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Current Weather Display */}
      <View style={styles.weatherDisplay}>
        <Ionicons 
          name={currentWeather.weather[0].main === 'Clear' ? 'sunny' : 'cloud'} 
          size={32} 
          color={COLORS.primary} 
        />
        <Text style={styles.temperature}>
          {Math.round(currentWeather.main.temp)}°C
        </Text>
        <Text style={styles.description}>
          {currentWeather.weather[0].description}
        </Text>
      </View>

      {/* Perception Question */}
      <Text style={styles.question}>Is this how you experience it?</Text>

      {/* Perception Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[
            styles.option,
            perceptionType === 'same' && styles.selectedOption
          ]}
          onPress={() => handlePerceptionSelect('same')}
        >
          <Ionicons 
            name="checkmark-circle" 
            size={24} 
            color={perceptionType === 'same' ? COLORS.primary : COLORS.textLight} 
          />
          <Text style={styles.optionText}>Yes, it feels like this</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.option,
            perceptionType === 'indoor' && styles.selectedOption
          ]}
          onPress={() => handlePerceptionSelect('indoor')}
        >
          <Ionicons 
            name="home" 
            size={24} 
            color={perceptionType === 'indoor' ? COLORS.primary : COLORS.textLight} 
          />
          <Text style={styles.optionText}>I'm indoors</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.option,
            perceptionType === 'different' && styles.selectedOption
          ]}
          onPress={() => handlePerceptionSelect('different')}
        >
          <Ionicons 
            name="refresh" 
            size={24} 
            color={perceptionType === 'different' ? COLORS.primary : COLORS.textLight} 
          />
          <Text style={styles.optionText}>It feels different</Text>
        </TouchableOpacity>
      </View>

      {/* Weather Selector */}
      {showSelector && (
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorLabel}>
            How does it feel to you?
          </Text>
          <WeatherSelector 
            selected={null} 
            onSelect={(weather) => {
              onWeatherSelect(weather);
              setShowSelector(false);
            }} 
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: SPACING.md,
  },
  weatherDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  description: {
    fontSize: 16,
    color: COLORS.textLight,
    textTransform: 'capitalize',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginVertical: SPACING.md,
  },
  optionsContainer: {
    gap: SPACING.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  selectedOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondary + '20',
  },
  optionText: {
    fontSize: 16,
    color: COLORS.text,
  },
  selectorContainer: {
    marginTop: SPACING.md,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
});

export default WeatherPerception;