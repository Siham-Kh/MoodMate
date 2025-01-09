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
        setMoodHistory(parsedHistory);
        // Set current mood to the most recent entry
        if (parsedHistory.length > 0) {
          const latestMood = parsedHistory[parsedHistory.length - 1];
          setCurrentMood(latestMood.mood);
        }
      }
    } catch (error) {
      console.error('Error loading mood history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMoodEntry = async (moodEntry) => {
    if (!moodEntry || !moodEntry.mood) {
      console.error('Invalid mood entry');
      return false;
    }

    try {
      const newHistory = [...moodHistory, moodEntry];
      setMoodHistory(newHistory);
      setCurrentMood(moodEntry.mood);
      
      await AsyncStorage.setItem('moodHistory', JSON.stringify(newHistory));
      return true;
    } catch (error) {
      console.error('Error saving mood:', error);
      return false;
    }
  };

  const editMoodEntry = async (timestamp, updatedEntry) => {
    try {
      const newHistory = moodHistory.map(entry =>
        entry.timestamp === timestamp ? updatedEntry : entry
      );
      setMoodHistory(newHistory);
      await AsyncStorage.setItem('moodHistory', JSON.stringify(newHistory));
      return true;
    } catch (error) {
      console.error('Error editing mood:', error);
      return false;
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        currentMood,
        setCurrentMood,
        moodHistory,
        saveMoodEntry,
        editMoodEntry,
        loadMoodHistory,
        isLoading
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}