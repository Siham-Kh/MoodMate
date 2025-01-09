// src/components/WeeklyMoodChart.js
import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';
import { LineChart } from 'react-native-chart-kit';

export default function WeeklyMoodChart({ moods }) {
  // 1) Build a list of the last 7 days
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }).reverse();

  // 2) Create data points (labels + values)
  const labels = [];
  const values = [];

  last7Days.forEach(date => {
    // Gather moods for that date
    const dayMoods = moods.filter(mood => mood.timestamp.startsWith(date));
    // Could count them or average them. Let's just do count:
    const count = dayMoods.length;

    // Convert date to short weekday, e.g. "Mon", "Tue"
    const weekday = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short'
    });

    labels.push(weekday);
    values.push(count);
  });

  // 3) Chart data object for react-native-chart-kit
  const data = {
    labels,
    datasets: [
      {
        data: values
      }
    ]
  };

  // 4) Dimensions for the chart
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 40; // some horizontal padding

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Mood Chart</Text>

      <LineChart
        data={data}
        width={chartWidth}
        height={220}
        yAxisLabel=""         // optional prefix
        yAxisSuffix=""        // optional suffix
        chartConfig={{
          backgroundColor: COLORS.background,
          backgroundGradientFrom: COLORS.background,
          backgroundGradientTo: COLORS.background,
          color: (opacity = 1) => COLORS.primary,
          labelColor: (opacity = 1) => COLORS.text,
          // optional props, e.g. strokeWidth, propsForDots...
        }}
        bezier                 // makes a smooth line
        style={styles.chart}
      />

      <View style={styles.legend}>
        {/* If you want a custom legend, add your items here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  chart: {
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
});
