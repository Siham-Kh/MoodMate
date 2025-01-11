// src/screens/DiscoverScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../constants/theme';
import { useActivity } from '../contexts/ActivityContext';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function DiscoverScreen() {
  const { currentMood } = useActivity();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(5);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const mapRef = useRef(null);
  const scrollView = useRef(null);

  // Mock data for testing
  const mockNearbyUsers = [
    {
      id: '1',
      name: 'Sarah',
      mood: { emoji: '😊', label: 'Happy' },
      activity: 'Walking in the park',
      coordinate: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      distance: '0.5 km',
    },
    // Add more mock users as needed
  ];

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setNearbyUsers(mockNearbyUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const customMapStyle = {
    urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    maximumZ: 19,
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT} // This makes it use the default (OSM) tiles
        initialRegion={{
          latitude: location?.coords.latitude || 37.78825,
          longitude: location?.coords.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      >
        {/* Current user marker */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <View style={styles.currentUserMarker}>
              <Text style={styles.markerEmoji}>{currentMood?.emoji || '😊'}</Text>
            </View>
          </Marker>
        )}

        {/* Nearby users markers */}
        {nearbyUsers.map((user, index) => (
          <Marker
            key={index}
            coordinate={user.coordinate}
          >
            <View style={styles.markerContainer}>
              <Text style={styles.markerEmoji}>{user.mood.emoji}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Radius control */}
      <View style={styles.radiusControl}>
        <Text style={styles.radiusText}>Search radius: {radius}km</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          value={radius}
          onValueChange={setRadius}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.border}
          thumbTintColor={COLORS.primary}
        />
      </View>

      {/* User cards */}
      <Animated.ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        style={styles.scrollView}
        contentContainerStyle={styles.cardsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {nearbyUsers.map((user, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{user.mood.emoji}</Text>
              <Text style={styles.cardName}>{user.name}</Text>
              <Text style={styles.cardDistance}>{user.distance}</Text>
            </View>
            <Text style={styles.cardActivity}>{user.activity}</Text>
            <TouchableOpacity style={styles.chatButton}>
              <Ionicons name="chatbubble" size={20} color={COLORS.background} />
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    map: {
      flex: 1,
    },
    radiusControl: {
      position: 'absolute',
      top: SPACING.lg,
      left: SPACING.lg,
      right: SPACING.lg,
      backgroundColor: COLORS.background,
      borderRadius: 12,
      padding: SPACING.md,
      elevation: 4,
      shadowColor: "#000",
      shadowRadius: 4,
      shadowOpacity: 0.3,
      shadowOffset: { x: 2, y: 2 },
    },
    radiusText: {
      fontSize: 14,
      color: COLORS.text,
      marginBottom: SPACING.sm,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    markerWrap: {
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
    },
    marker: {
      width: 35,
      height: 35,
      borderRadius: 20,
      backgroundColor: COLORS.background,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      shadowColor: "#000",
      shadowRadius: 2,
      shadowOpacity: 0.3,
      shadowOffset: { x: 1, y: 1 },
    },
    markerText: {
      fontSize: 24,
    },
    ring: {
      width: 35,
      height: 35,
      borderRadius: 20,
      backgroundColor: COLORS.primary + '40',
      position: "absolute",
      borderWidth: 1,
      borderColor: COLORS.primary,
    },
  });