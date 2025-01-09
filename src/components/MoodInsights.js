// src/components/MoodInsights.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

export default function MoodInsights({ moods }) {
  // Calculate insights
  const insights = {
    mostFrequentMood: calculateMostFrequentMood(moods),
    bestTimeOfDay: calculateBestTimeOfDay(moods),
    moodTrend: calculateMoodTrend(moods),
    totalEntries: moods.length
  };

  return (
    <View style={styles.container}>
      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Most Frequent Mood</Text>
        <View style={styles.insightContent}>
          <Text style={styles.emoji}>{insights.mostFrequentMood?.emoji}</Text>
          <Text style={styles.insightText}>{insights.mostFrequentMood?.label}</Text>
        </View>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Best Time of Day</Text>
        <Text style={styles.insightText}>{insights.bestTimeOfDay}</Text>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Weekly Trend</Text>
        <Text style={styles.insightText}>{insights.moodTrend}</Text>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>Total Entries</Text>
        <Text style={styles.insightText}>{insights.totalEntries}</Text>
      </View>
    </View>
  );
}

// Helper functions for calculations  >> need work
function calculateMostFrequentMood(moods) {
  const moodCounts = moods.reduce((counts, entry) => {
    const moodId = entry.mood.id;
    counts[moodId] = (counts[moodId] || 0) + 1;
    return counts;
  }, {});

  const mostFrequentId = Object.entries(moodCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  return moods.find(entry => entry.mood.id === mostFrequentId)?.mood;
}

function calculateBestTimeOfDay(moods) {
  const timeSlots = {
    morning: 0,
    afternoon: 0,
    evening: 0,
  };

  moods.forEach(entry => {
    const hour = new Date(entry.timestamp).getHours();
    if (hour >= 5 && hour < 12) timeSlots.morning++;
    else if (hour >= 12 && hour < 17) timeSlots.afternoon++;
    else timeSlots.evening++;
  });

  const best = Object.entries(timeSlots)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  return best ? best.charAt(0).toUpperCase() + best.slice(1) : 'Not enough data';
}

function calculateMoodTrend(moods) {
  if (moods.length < 2) return 'Not enough data';

  // Simple trend calculation based on last few entries
  const recentMoods = moods.slice(-5);
  const positiveCount = recentMoods.filter(entry => 
    ['happy', 'energetic', 'peaceful'].includes(entry.mood.id)
  ).length;

  if (positiveCount >= 3) return 'Trending up 📈';
  if (positiveCount <= 1) return 'Trending down 📉';
  return 'Stable 📊';
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.md,
  },
  insightCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textLight,
    marginBottom: SPACING.sm,
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  emoji: {
    fontSize: 24,
  },
  insightText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
});