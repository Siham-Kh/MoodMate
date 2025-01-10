// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useActivity } from '../contexts/ActivityContext';
import MoodSelector from '../components/MoodSelector';
import WeatherPerception from '../components/WeatherPerception';  // Fixed import path
import { fetchWeather } from '../services/weatherService';
import * as Location from 'expo-location';
import { COLORS } from '../constants/theme';

export default function HomeScreen({ navigation }) {
  const {
    currentMood,
    setCurrentMood,
    currentWeather,
    setCurrentWeather,
    saveMoodEntry
  } = useActivity();

  const [fetchedWeather, setFetchedWeather] = useState(null);  // Renamed from weatherData
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission needed');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const data = await fetchWeather(
        location.coords.latitude,
        location.coords.longitude
      );
      console.log('Weather data received:', data); // Debug log
      setFetchedWeather(data);
    } catch (err) {
      console.error('Weather loading error:', err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSubmit = async (moodEntry) => {
    try {
      await saveMoodEntry(moodEntry);
      setCurrentMood(moodEntry.mood);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <WeatherPerception
        currentWeather={fetchedWeather}  // Using renamed state variable
        onWeatherSelect={setCurrentWeather}
        loading={loading}
        error={error}
      />
      <MoodSelector
        onMoodSelect={handleMoodSubmit}
        selected={currentMood}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});