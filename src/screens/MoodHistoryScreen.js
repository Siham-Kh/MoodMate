import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useActivity } from '../contexts/ActivityContext';
import { COLORS, SPACING } from '../constants/theme';
import WeeklyMoodChart from '../components/WeeklyMoodChart';
import MoodList from '../components/MoodList';
import MoodInsights from '../components/MoodInsights';

export default function MoodHistoryScreen() {
  const { moodHistory } = useActivity();

  // Group moods by date
  const groupedMoods = moodHistory.reduce((groups, mood) => {
    const date = new Date(mood.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(mood);
    return groups;
  }, {});

  // Calculate mood stats
  const moodStats = {
    totalEntries: moodHistory.length,
    bestDay: {
      date: null,
      moods: []
    },
    worstDay: {
      date: null,
      moods: []
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Mood History</Text>
      
      {/* Weekly Pattern Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Pattern</Text>
        <WeeklyMoodChart moods={moodHistory} />
      </View>

      {/* Recent History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent History</Text>
        <MoodList moods={moodHistory} />
      </View>

      {/* Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Insights</Text>
        <MoodInsights moods={moodHistory} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
});