// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ActivityProvider } from './src/contexts/ActivityContext';
import HomeScreen from './src/screens/HomeScreen';
import SuggestionsScreen from './src/screens/SuggestionsScreen';
import MoodHistoryScreen from './src/screens/MoodHistoryScreen';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/constants/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <ActivityProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.primary,
              },
              headerTintColor: COLORS.background,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                paddingBottom: 5,
                paddingTop: 5,
                height: 60,
              },
            }}
          >
            <Tab.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                title: 'MoodMate',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="History" 
              component={MoodHistoryScreen}
              options={{
                title: 'Mood History',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="bar-chart" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen 
              name="Suggestions" 
              component={SuggestionsScreen}
              options={{
                title: 'Activities',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="list" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ActivityProvider>
    </SafeAreaProvider>
  );
}