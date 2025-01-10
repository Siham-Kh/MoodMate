// src/screens/HomeScreen.js
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useActivity } from '../contexts/ActivityContext';
import MoodSelector from '../components/MoodSelector';
import WeatherSelector from '../components/WeatherSelector';
import WeatherWidget from '../components/WeatherWidget';
import { COLORS, SPACING } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const {
    currentMood,
    setCurrentMood,
    currentWeather,
    setCurrentWeather,
    saveMoodEntry
  } = useActivity();

  // Handle mood submission from MoodSelector
  const handleMoodSubmit = async (moodEntry) => {
    try {
      await saveMoodEntry(moodEntry);
      setCurrentMood(moodEntry.mood);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  const handleNext = () => {
    if (currentMood && currentWeather) {
      navigation.navigate('Suggestions');
    }
  };

  const handleWeatherSelect = (weather) => {
    setCurrentWeather(weather);
  };

  return (
    <ScrollView style={styles.container}>
      <MoodSelector
        onMoodSelect={handleMoodSubmit}
        selected={currentMood}
      />
      <WeatherSelector
        selected={currentWeather}
        onSelect={handleWeatherSelect}
      />
      <WeatherWidget />
      <TouchableOpacity
        style={[
          styles.nextButton,
          (!currentMood || !currentWeather) && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={!currentMood || !currentWeather}
      >
        <Text style={styles.nextButtonText}>Get Activities</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});