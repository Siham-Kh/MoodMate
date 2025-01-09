// src/screens/SuggestionsScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Animated,
} from 'react-native';
import { useActivity } from '../contexts/ActivityContext';
import { ACTIVITIES } from '../constants/activities';
import { COLORS, SPACING, SHADOW } from '../constants/theme';

export default function SuggestionsScreen() {
  const { currentMood, currentWeather, saveActivity } = useActivity();
  const fadeAnims = React.useRef(
    Array(5).fill(0).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    fadeAnims.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: i * 100,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const getActivities = () => {
    const moodActivities = ACTIVITIES[currentMood.id];
    return moodActivities ? moodActivities[currentWeather.id] : [];
  };

  const handleShare = async (activity) => {
    try {
      await Share.share({
        message: `I'm going to ${activity} with MoodMate! 🎯✨`,
      });
      await saveActivity(activity);
    } catch (error) {
      console.error('Error sharing activity:', error);
    }
  };

  const suggestedActivities = getActivities();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>
          {currentMood?.emoji} {currentWeather?.emoji}
        </Text>
        <Text style={styles.headerText}>
          Here are some activities for when you're feeling{' '}
          <Text style={styles.highlight}>{currentMood?.label}</Text> on a{' '}
          <Text style={styles.highlight}>{currentWeather?.label}</Text> day
        </Text>
      </View>

      <View style={styles.activitiesList}>
        {suggestedActivities.map((activity, index) => (
          <Animated.View
            key={index}
            style={[
              styles.activityCard,
              { opacity: fadeAnims[index] },
              SHADOW.small,
            ]}
          >
            <Text style={styles.activityText}>{activity}</Text>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => handleShare(activity)}
            >
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.textLight,
    lineHeight: 24,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  activitiesList: {
    padding: SPACING.md,
  },
  activityCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
    marginRight: SPACING.sm,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  shareButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
});