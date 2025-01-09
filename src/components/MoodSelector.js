// src/components/MoodSelector.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

export const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: '#FFD700' },
  { id: 'calm', emoji: '😌', label: 'Calm', color: '#98FB98' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: '#87CEEB' },
  { id: 'energetic', emoji: '⚡', label: 'Energetic', color: '#FFA500' },
  { id: 'tired', emoji: '😴', label: 'Tired', color: '#DDA0DD' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: '#F08080' }
];

export default function MoodSelector({ onMoodSelect = () => {} }) { // Add default empty function
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);

  const handleMoodSelect = (mood) => {
    if (!mood) return; // Guard clause
    setSelectedMood(mood);
    setShowNote(true);
  };

  const handleSubmit = () => {
    if (!selectedMood) return; // Guard clause

    const moodEntry = {
      mood: selectedMood,
      note: note.trim(), // Trim whitespace
      timestamp: new Date().toISOString()
    };
    
    try {
      onMoodSelect(moodEntry);
      Alert.alert('Success', 'Your mood has been logged!');
      
      // Reset form
      setNote('');
      setShowNote(false);
      setSelectedMood(null);
    } catch (error) {
      console.error('Error submitting mood:', error);
      Alert.alert('Error', 'Failed to save your mood. Please try again.');
    }
  };

  const handleCancel = () => {
    setShowNote(false);
    setNote('');
    setSelectedMood(null);
  };

  return (
    <View style={styles.container}>
      {!showNote ? (
        <>
          <Text style={styles.question}>How are you feeling?</Text>
          <View style={styles.moodGrid}>
            {MOODS.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodButton,
                  selectedMood?.id === mood.id && styles.selectedButton,
                  { backgroundColor: mood.color + '20' }
                ]}
                onPress={() => handleMoodSelect(mood)}
                activeOpacity={0.7} // Add feedback on press
              >
                <Text style={styles.emoji}>{mood.emoji}</Text>
                <Text style={styles.label}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.noteContainer}>
          <Text style={styles.selectedMoodText}>
            Feeling {selectedMood?.label} {selectedMood?.emoji}
          </Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Why do you feel this way? (optional)"
            value={note}
            onChangeText={setNote}
            multiline
            maxLength={200}
            textAlignVertical="top" // Better alignment for Android
            returnKeyType="done"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.editButton]} 
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, styles.editButtonText]}>Change Mood</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]} 
              onPress={handleSubmit}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    justifyContent: 'space-between',
  },
  moodButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  emoji: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  noteContainer: {
    padding: SPACING.md,
  },
  selectedMoodText: {
    fontSize: 18,
    marginBottom: SPACING.md,
    textAlign: 'center',
    color: COLORS.text,
    fontWeight: '600',
  },
  noteInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    minHeight: 100,
    marginBottom: SPACING.md,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  editButton: {
    backgroundColor: COLORS.secondary,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButtonText: {
    color: COLORS.text, // Different color for edit button text
  },
});