// src/screens/SuggestionsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Dimensions,
  Animated,
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

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = WINDOW_WIDTH * 0.8;
const CARD_SPACING = SPACING.md;

// Activity Card Component
const ActivityCard = ({ activity, index, scrollX, onShare }) => {
  const inputRange = [
    (index - 1) * (CARD_WIDTH + CARD_SPACING),
    index * (CARD_WIDTH + CARD_SPACING),
    (index + 1) * (CARD_WIDTH + CARD_SPACING),
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 1, 0.6],
  });

  return (
    <Animated.View
      style={[
        styles.activityCard,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <View style={styles.activityHeader}>
        <View style={[
          styles.cardIconContainer,
          { backgroundColor: activity.indoor ? COLORS.secondary + '40' : COLORS.primary + '40' }
        ]}>
          <Ionicons 
            name={activity.indoor ? "home" : "leaf"} 
            size={32} 
            color={activity.indoor ? COLORS.secondary : COLORS.primary} 
          />
        </View>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => onShare(activity)}
        >
          <Ionicons name="share-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.activityTitle}>{activity.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {activity.description}
      </Text>
      
      <View style={styles.tags}>
        <View style={styles.tag}>
          <Ionicons name="time-outline" size={16} color={COLORS.textLight} />
          <Text style={styles.tagText}>{DURATION_LABELS[activity.duration]}</Text>
        </View>
        <View style={styles.tag}>
          <Ionicons name="trending-up" size={16} color={COLORS.textLight} />
          <Text style={styles.tagText}>{IMPACT_LABELS[activity.impact]}</Text>
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
    </Animated.View>
  );
};

// Duration Filter
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

// Main Screen Component
export default function SuggestionsScreen() {
  const { currentMood, currentWeather } = useActivity();
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [activities, setActivities] = useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentMood && currentWeather) {
      const moodActivities = ACTIVITIES[currentMood.id];
      
      if (moodActivities) {
        const weatherActivities = moodActivities[currentWeather.id];
        
        if (weatherActivities) {
          const filteredActivities = selectedDuration
            ? weatherActivities.filter(activity => activity.duration === selectedDuration)
            : weatherActivities;
          
          setActivities(filteredActivities);
        } else {
          setActivities([]);
        }
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
    <View style={styles.container}>
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

      {activities.length > 0 ? (
        <Animated.FlatList
          horizontal
          data={activities}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.cardsContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => (
            <ActivityCard
              activity={item}
              index={index}
              scrollX={scrollX}
              onShare={handleShare}
            />
          )}
          keyExtractor={item => item.id}
        />
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
    backgroundColor: COLORS.secondary + '40',
    marginBottom: SPACING.md,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.text,
    lineHeight: 24,
  },
  highlight: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  filtersContainer: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  filterScroll: {
    flexDirection: 'row',
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
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  filterButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    color: COLORS.text,
    fontWeight: '500',
  },
  filterTextSelected: {
    color: COLORS.background,
  },
  cardsContainer: {
    paddingHorizontal: WINDOW_WIDTH * 0.07,
    paddingVertical: SPACING.md,
  },
  activityCard: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    marginHorizontal: CARD_SPACING / 2,
    padding: SPACING.lg,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 300, // Fixed height to contain content
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    paddingRight: SPACING.lg, // Space for share button
  },
  description: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    paddingRight: SPACING.sm, // Prevent overflow
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: 'auto', // Push to bottom of card
    paddingTop: SPACING.md,
  },
  benefitTag: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  benefitText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  },
  noActivitiesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  noActivitiesText: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
  }
});