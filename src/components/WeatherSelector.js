// src/components/WeatherSelector.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, SHADOW } from '../constants/theme';

export const WEATHER_TYPES = [
  { id: 'sunny', emoji: '☀️', label: 'Sunny' },
  { id: 'cloudy', emoji: '☁️', label: 'Cloudy' },
  { id: 'rainy', emoji: '🌧️', label: 'Rainy' },
  { id: 'windy', emoji: '💨', label: 'Windy' },
];

export default function WeatherSelector({ selected, onSelect }) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What's the weather like?</Text>
      <View style={styles.grid}>
        {WEATHER_TYPES.map((weather) => (
          <TouchableOpacity
            key={weather.id}
            style={[
              styles.weatherButton,
              selected?.id === weather.id && styles.selectedButton,
              SHADOW.small,
            ]}
            onPress={() => onSelect(weather)}
          >
            <Text style={styles.emoji}>{weather.emoji}</Text>
            <Text style={styles.label}>{weather.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    justifyContent: 'space-between',
  },
  weatherButton: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedButton: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  emoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 16,
    color: COLORS.textLight,
  },
});