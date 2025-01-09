import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import { useActivity } from '../contexts/ActivityContext';

function MoodItem({ mood }) {
  const date = new Date(mood.timestamp);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <TouchableOpacity style={styles.moodItem}>
      <View style={styles.moodHeader}>
        <View style={styles.moodEmoji}>
          <Text style={styles.emoji}>{mood.mood.emoji}</Text>
        </View>
        <View style={styles.moodInfo}>
          <Text style={styles.moodLabel}>{mood.mood.label}</Text>
          <Text style={styles.timestamp}>{formattedTime}</Text>
        </View>
      </View>
      {mood.note && <Text style={styles.note}>{mood.note}</Text>}
    </TouchableOpacity>
  );
}

export default function MoodList({ moods }) {
  const { isLoading } = useActivity();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!moods || moods.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No mood entries yet</Text>
      </View>
    );
  }

  // Group moods by date using ISO format (YYYY-MM-DD)
  const groupedMoods = moods.reduce((groups, mood) => {
    // Create a Date object from the timestamp
    const moodDate = new Date(mood.timestamp);
    
    // Get the date string in ISO format (YYYY-MM-DD)
    const dateKey = moodDate.toISOString().split('T')[0];

    // Initialize the group if it doesn't exist
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    // Add the mood to its corresponding date group
    groups[dateKey].push(mood);
    
    return groups;
  }, {});

  return (
    <View style={styles.container}>
      {Object.entries(groupedMoods)
        .sort((a, b) => new Date(b[0]) - new Date(a[0]))  // Sort dates in descending order
        .map(([date, dayMoods]) => (
          <View key={date} style={styles.dayGroup}>
            <Text style={styles.dateHeader}>
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
            {dayMoods.map((mood) => (
              <MoodItem key={mood.timestamp} mood={mood} />
            ))}
          </View>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayGroup: {
    marginBottom: SPACING.lg,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  moodItem: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  moodHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  moodEmoji: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },
  emoji: {
    fontSize: 24,
  },
  moodInfo: {
    flex: 1,
  },
  moodLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  note: {
    marginTop: SPACING.sm,
    color: COLORS.text,
    fontSize: 14,
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.textLight,
    fontSize: 16,
  },
});