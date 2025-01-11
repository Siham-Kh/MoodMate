import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useActivity } from '../contexts/ActivityContext';
import { 
  ACTIVITIES, 
  ACTIVITY_DURATIONS, 
  DURATION_LABELS,
  IMPACT_LABELS 
} from '../constants/activities';
import { COLORS, SPACING } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

// Activity Card Component remains the same...
const ActivityCard = ({ activity, onShare }) => (
  <View style={styles.activityCard}>
    <View style={styles.activityHeader}>
      <Text style={styles.activityTitle}>{activity.title}</Text>
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => onShare(activity)}
      >
        <Ionicons name="share-outline" size={24} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
    
    <Text style={styles.description}>{activity.description}</Text>
    
    <View style={styles.tags}>
      <View style={styles.tag}>
        <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
        <Text style={styles.tagText}>{DURATION_LABELS[activity.duration]}</Text>
      </View>
      <View style={styles.tag}>
        <Ionicons name="trending-up" size={16} color={COLORS.textLight} />
        <Text style={styles.tagText}>{IMPACT_LABELS[activity.impact]}</Text>
      </View>
      <View style={styles.tag}>
        <Ionicons 
          name={activity.indoor ? 'home-outline' : 'leaf-outline'} 
          size={16} 
          color={COLORS.textLight} 
        />
        <Text style={styles.tagText}>
          {activity.indoor ? 'Indoor' : 'Outdoor'}
        </Text>
      </View>
    </View>

    {activity.benefits && (
      <View style={styles.benefits}>
        {activity.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitTag}>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
    )}
  </View>
);

// Duration Filter Component
const DurationFilter = ({ selected, onSelect }) => (
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    style={styles.filterScroll}
  >
    <TouchableOpacity
      style={[
        styles.filterButton,
        selected === null && styles.filterButtonSelected,
      ]}
      onPress={() => onSelect(null)}
    >
      <Text style={[
        styles.filterText,
        selected === null && styles.filterTextSelected,
      ]}>
        All
      </Text>
    </TouchableOpacity>
    {Object.entries(DURATION_LABELS).map(([duration, label]) => (
      <TouchableOpacity
        key={duration}
        style={[
          styles.filterButton,
          selected === duration && styles.filterButtonSelected,
        ]}
        onPress={() => onSelect(duration)}
      >
        <Text style={[
          styles.filterText,
          selected === duration && styles.filterTextSelected,
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

export default function SuggestionsScreen() {
  const { currentMood, currentWeather } = useActivity();
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Debug logs
    console.log('Current mood:', currentMood);
    console.log('Current weather:', currentWeather);
    console.log('Selected duration:', selectedDuration);
    
    if (currentMood && currentWeather) {
      // Get the mood activities
      const moodActivities = ACTIVITIES[currentMood.id];
      console.log('Found mood activities:', moodActivities);

      if (moodActivities) {
        // Get weather-specific activities
        const weatherActivities = moodActivities[currentWeather.id];
        console.log('Found weather activities:', weatherActivities);

        if (weatherActivities) {
          // Filter by duration if selected
          const filteredActivities = selectedDuration
            ? weatherActivities.filter(activity => activity.duration === selectedDuration)
            : weatherActivities;
            
          console.log('Filtered activities:', filteredActivities);
          setActivities(filteredActivities);
        } else {
          console.log('No activities found for this weather');
          setActivities([]);
        }
      } else {
        console.log('No activities found for this mood');
        setActivities([]);
      }
    }
  }, [currentMood, currentWeather, selectedDuration]);

  const handleShare = async (activity) => {
    try {
      await Share.share({
        message: `I'm going to ${activity.title} with MoodMate! 🎯✨\n\n${activity.description}`,
      });
    } catch (error) {
      console.error('Error sharing activity:', error);
    }
  };

  // Debug render
  console.log('Rendering with activities:', activities);
  console.log('Current render state:', { 
    hasMood: !!currentMood, 
    hasWeather: !!currentWeather, 
    activitiesLength: activities?.length 
  });

  if (!currentMood || !currentWeather) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Please select your mood and weather first
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>
          {currentMood.emoji} {currentWeather.emoji}
        </Text>
        <Text style={styles.headerText}>
          Activities for when you're feeling{' '}
          <Text style={styles.highlight}>{currentMood.label}</Text> on a{' '}
          <Text style={styles.highlight}>{currentWeather.label}</Text> day
        </Text>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Duration</Text>
        <DurationFilter
          selected={selectedDuration}
          onSelect={setSelectedDuration}
        />
      </View>

      <View style={styles.activitiesList}>
        {activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityCard
              key={activity.id || index}
              activity={activity}
              onShare={handleShare}
            />
          ))
        ) : (
          <View style={styles.noActivitiesContainer}>
            <Text style={styles.noActivitiesText}>
              {selectedDuration 
                ? 'No activities found for the selected duration'
                : 'No activities available for current mood and weather'}
            </Text>
          </View>
        )}
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
    alignItems: "center",
    backgroundColor: COLORS.secondary + "40",
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.text,
    lineHeight: 24,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  filtersContainer: {
    padding: SPACING.md,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  filterScroll: {
    flexDirection: "row",
    paddingBottom: SPACING.sm,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.text,
  },
  filterTextSelected: {
    color: COLORS.background,
  },
  activitiesList: {
    padding: SPACING.md,
  },
  activityCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  benefits: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  benefitTag: {
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  benefitText: {
    fontSize: 12,
    color: COLORS.primary,
  },
  shareButton: {
    padding: SPACING.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
  },
  noActivitiesText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
    padding: SPACING.xl,
  },
});
