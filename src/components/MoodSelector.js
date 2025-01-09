import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { COLORS, SPACING } from "../constants/theme";
import { Animated } from "react-native";

export const MOODS = [
  { id: "happy", emoji: "😊", label: "Happy", color: "#FFD700" },
  { id: "calm", emoji: "😌", label: "Calm", color: "#98FB98" },
  { id: "sad", emoji: "😢", label: "Sad", color: "#87CEEB" },
  { id: "energetic", emoji: "⚡", label: "Energetic", color: "#FFA500" },
  { id: "tired", emoji: "😴", label: "Tired", color: "#DDA0DD" },
  { id: "anxious", emoji: "😰", label: "Anxious", color: "#F08080" },
  { id: "placeholder", emoji: "", label: "", color: "transparent" },
  { id: "other", emoji: "🔍", label: "More", color: "#A9A9A9" },
  { id: "placeholder2", emoji: "", label: "", color: "transparent" },
];

const EXTRA_MOODS = [
  { id: "excited", emoji: "🥳", label: "Excited", color: "#FF69B4" },
  { id: "stressed", emoji: "😫", label: "Stressed", color: "#FF6347" },
  { id: "grateful", emoji: "🙏", label: "Grateful", color: "#DEB887" },
  { id: "proud", emoji: "😎", label: "Proud", color: "#20B2AA" },
  { id: "lonely", emoji: "🥺", label: "Lonely", color: "#B8860B" },
  { id: "loved", emoji: "🥰", label: "Loved", color: "#FF69B4" },
  { id: "angry", emoji: "😠", label: "Angry", color: "#FF4500" },
  { id: "surprised", emoji: "😮", label: "Surprised", color: "#BA55D3" },
  { id: "worried", emoji: "😟", label: "Worried", color: "#8B8B83" },
  { id: "silly", emoji: "🤪", label: "Silly", color: "#FF69B4" },
  { id: "confident", emoji: "💪", label: "Confident", color: "#4169E1" },
  { id: "hopeful", emoji: "🌟", label: "Hopeful", color: "#FFD700" },
  { id: "motivated", emoji: "🎯", label: "Motivated", color: "#32CD32" },
  { id: "creative", emoji: "🎨", label: "Creative", color: "#9370DB" },
  { id: "relaxed", emoji: "🌴", label: "Relaxed", color: "#98FB98" },
];

export default function MoodSelector({ onMoodSelect = () => {} }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [showExtraMoods, setShowExtraMoods] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (showExtraMoods) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [showExtraMoods]);

  const handleMoodSelect = (mood) => {
    if (!mood) return;
    if (mood.id === "other") {
      setShowExtraMoods(true);
      return;
    }
    setSelectedMood(mood);
    setShowNote(true);
  };

  const handleSubmit = () => {
    if (!selectedMood) return;

    const moodEntry = {
      mood: selectedMood,
      note: note.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      onMoodSelect(moodEntry);
      Alert.alert("Success", "Your mood has been logged!");

      // Reset form
      setNote("");
      setShowNote(false);
      setSelectedMood(null);
    } catch (error) {
      console.error("Error submitting mood:", error);
      Alert.alert("Error", "Failed to save your mood. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowNote(false);
    setNote("");
    setSelectedMood(null);
  };

  return (
    <View style={styles.container}>
      {!showNote ? (
        <>
          <Text style={styles.question}>How are you feeling?</Text>
          <View style={styles.moodGrid}>
            {MOODS.map((mood) =>
              mood.id.includes("placeholder") ? (
                <View key={mood.id} style={{ width: "30%" }} />
              ) : (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.moodButton,
                    selectedMood?.id === mood.id && styles.selectedButton,
                    mood.id === "other" && styles.moreMoodButton,
                    { backgroundColor: mood.color + "20" },
                  ]}
                  onPress={() => handleMoodSelect(mood)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.emoji}>{mood.emoji}</Text>
                  <Text style={styles.label}>{mood.label}</Text>
                </TouchableOpacity>
              )
            )}
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
            textAlignVertical="top"
            returnKeyType="done"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={handleCancel}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, styles.editButtonText]}>
                Change Mood
              </Text>
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

      <Modal
        visible={showExtraMoods}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExtraMoods(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>More Moods</Text>

            {/* Scroll container that wraps the list of extra moods */}
            <View style={styles.scrollViewContainer}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.moodGrid}>
                  {EXTRA_MOODS.map((mood) => (
                    <TouchableOpacity
                      key={mood.id}
                      style={[
                        styles.moodButton,
                        { backgroundColor: mood.color + "20" },
                      ]}
                      onPress={() => {
                        handleMoodSelect(mood);
                        setShowExtraMoods(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.emoji}>{mood.emoji}</Text>
                      <Text style={styles.label}>{mood.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Close button placed AFTER the scrollView, so you see all emojis */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowExtraMoods(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    justifyContent: "space-between",
  },
  moodButton: {
    width: "28%",
    aspectRatio: 1,
    backgroundColor: COLORS.background,
    borderRadius: 2,
    padding: SPACING.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
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
  moreMoodButton: {
    marginHorizontal: "auto",
    backgroundColor: COLORS.secondary + "30",
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
    fontSize: 10,
    color: COLORS.text,
    fontWeight: "500",
  },
  noteContainer: {
    padding: SPACING.md,
  },
  selectedMoodText: {
    fontSize: 18,
    marginBottom: SPACING.md,
    textAlign: "center",
    color: COLORS.text,
    fontWeight: "600",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    minHeight: 100,
    marginBottom: SPACING.md,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
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
    fontWeight: "bold",
    fontSize: 16,
  },
  editButtonText: {
    color: COLORS.text,
  },

  // Modal background overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: SPACING.md,
  },

  // Single modal content style (merged & cleaned)
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.lg,
    width: "90%",
    maxHeight: "60%", // If the user has many moods, they can still scroll
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  // Title for the modal
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: "center",
  },

  // Constrain the ScrollView so it will scroll if content is taller
  scrollViewContainer: {
    maxHeight: "60%", // Adjust as needed to show more or less
    marginBottom: SPACING.lg, // Some space before the close button
  },

  // Extra padding below the emoji grid so the last row isn't cut off
  scrollContent: {
    paddingBottom: SPACING.xl,
  },

  // Close button placed below scroll content
  closeButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: SPACING.sm,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  closeButtonText: {
    color: COLORS.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});
