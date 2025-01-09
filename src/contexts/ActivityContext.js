// src/contexts/ActivityContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivityContext = createContext();

export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}

export function ActivityProvider({ children }) {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load mood history when component mounts
  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = async () => {
    try {
      setIsLoading(true);
      const savedHistory = await AsyncStorage.getItem('moodHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        // Sort by timestamp, most recent first
        setMoodHistory(parsedHistory.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        ));
      }
    } catch (error) {
      console.error('Error loading mood history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMoodEntry = async (moodEntry) => {
    try {
      // Create new history array with the new entry
      const newHistory = [...moodHistory, moodEntry].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );

      // Update state first for immediate UI update
      setMoodHistory(newHistory);
      setCurrentMood(moodEntry.mood);

      // Then save to AsyncStorage
      await AsyncStorage.setItem('moodHistory', JSON.stringify(newHistory));
      return true;
    } catch (error) {
      console.error('Error saving mood:', error);
      return false;
    }
  };

  const deleteMoodEntry = async (timestamp) => {
    try {
      const newHistory = moodHistory.filter(entry => entry.timestamp !== timestamp);
      setMoodHistory(newHistory);
      await AsyncStorage.setItem('moodHistory', JSON.stringify(newHistory));
      return true;
    } catch (error) {
      console.error('Error deleting mood:', error);
      return false;
    }
  };

  const value = {
    currentMood,
    setCurrentMood,
    moodHistory,
    saveMoodEntry,
    deleteMoodEntry,
    loadMoodHistory,
    isLoading
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}