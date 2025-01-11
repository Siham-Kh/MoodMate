// src/components/NearbyUserCard.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function NearbyUserCard({ user, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.moodContainer}>
          <Text style={styles.emoji}>{user.mood.emoji}</Text>
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <View style={styles.distanceContainer}>
          <Ionicons name="location" size={16} color={COLORS.primary} />
          <Text style={styles.distance}>{user.distance}</Text>
        </View>
      </View>

      <View style={styles.activityContainer}>
        <Ionicons name="play-circle" size={20} color={COLORS.primary} />
        <Text style={styles.activity}>{user.activity}</Text>
      </View>

      <View style={styles.footer}>
        {user.openToJoin && (
          <View style={styles.joinBadge}>
            <Ionicons name="people" size={16} color={COLORS.primary} />
            <Text style={styles.joinText}>Open to join</Text>
          </View>
        )}
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble" size={20} color={COLORS.background} />
          <Text style={styles.chatText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: 2 },
    height: 200,
    width: CARD_WIDTH,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  emoji: {
    fontSize: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: COLORS.secondary + '20',
    borderRadius: 10,
    marginVertical: SPACING.sm,
  },
  activity: {
    color: COLORS.text,
    fontSize: 15,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  joinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  joinText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '500',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  chatText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: '500',
  },
});