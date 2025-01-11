// // src/constants/activities.js
// export const ACTIVITIES = {
//   happy: {
//     sunny: [
//       'Go for a nature walk',
//       'Have a picnic in the park',
//       'Practice outdoor yoga',
//       'Start a garden project',
//       'Play frisbee with friends',
//     ],
//     cloudy: [
//       'Visit a local café',
//       'Take a photography walk',
//       'Join a community class',
//       'Draw or paint',
//       'Call a friend for a walk',
//     ],
//     rainy: [
//       'Write in your journal',
//       'Try a new recipe',
//       'Start a craft project',
//       'Have an indoor dance party',
//       'Read a feel-good book',
//     ],
//     windy: [
//       'Fly a kite',
//       'Go for a scenic drive',
//       'Take nature photos',
//       'Do outdoor stretches',
//       'Watch clouds move',
//     ],
//   },
//   anxious: {
//     sunny: [
//       'Practice deep breathing in nature',
//       'Walk barefoot in grass',
//       'Do gentle sun salutations',
//       'Find a quiet park bench',
//       'Garden mindfully',
//     ],
//     cloudy: [
//       'Join a yoga class',
//       'Practice mindful walking',
//       'Visit a quiet museum',
//       'Try some gentle stretching',
//       'Write in a journal',
//     ],
//     rainy: [
//       'Do indoor meditation',
//       'Practice deep breathing',
//       'Try a calming craft',
//       'Read a comforting book',
//       'Listen to rain sounds',
//     ],
//     windy: [
//       'Indoor meditation session',
//       'Try progressive relaxation',
//       'Paint your feelings',
//       'Practice mindful breathing',
//       'Write in your journal',
//     ],
//   },
//   tired: {
//     sunny: [
//       'Take a short nature walk',
//       'Find a sunny spot to rest',
//       'Do gentle stretches outside',
//       'Have a picnic',
//       'Practice light gardening',
//     ],
//     cloudy: [
//       'Take a power nap',
//       'Do gentle indoor yoga',
//       'Have a relaxing tea break',
//       'Listen to calm music',
//       'Read in a cozy corner',
//     ],
//     rainy: [
//       'Take a warm bath',
//       'Practice restorative yoga',
//       'Listen to rain sounds',
//       'Do light stretching',
//       'Have a peaceful nap',
//     ],
//     windy: [
//       'Indoor relaxation',
//       'Gentle stretching',
//       'Take a power nap',
//       'Listen to calming music',
//       'Practice mindful rest',
//     ],
//   },
// };

// src/constants/activities.js

export const ACTIVITY_DURATIONS = {
  QUICK: 'quick',   // 5-15 mins
  SHORT: 'short',   // 15-30 mins
  MEDIUM: 'medium', // 30-60 mins
  LONG: 'long',     // 60+ mins
};

export const MOOD_IMPACT = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

export const DURATION_LABELS = {
  [ACTIVITY_DURATIONS.QUICK]: '5-15 mins',
  [ACTIVITY_DURATIONS.SHORT]: '15-30 mins',
  [ACTIVITY_DURATIONS.MEDIUM]: '30-60 mins',
  [ACTIVITY_DURATIONS.LONG]: '60+ mins',
};

export const IMPACT_LABELS = {
  [MOOD_IMPACT.LOW]: 'Subtle mood lift',
  [MOOD_IMPACT.MEDIUM]: 'Noticeable improvement',
  [MOOD_IMPACT.HIGH]: 'Significant boost',
};

export const ACTIVITIES = {
  happy: {
    sunny: [
      {
        id: 'nature_walk',
        title: 'Nature Walk',
        description: 'Take an energizing walk in nature to boost your mood',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Exercise', 'Fresh air', 'Nature connection'],
        indoor: false,
      },
      {
        id: 'picnic',
        title: 'Have a Picnic',
        description: 'Enjoy a meal outdoors in the sunshine',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Fresh air', 'Joy', 'Relaxation'],
        indoor: false,
      },
      {
        id: 'photography_walk',
        title: 'Photography Walk',
        description: 'Capture beautiful moments on a sunny day',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Creativity', 'Mindfulness', 'Exercise'],
        indoor: false,
      }
    ],
    cloudy: [
      {
        id: 'cafe_visit',
        title: 'Visit a Café',
        description: 'Treat yourself to your favorite drink',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Comfort', 'Relaxation', 'Change of scenery'],
        indoor: true,
      },
      {
        id: 'dance_party',
        title: 'Indoor Dance Party',
        description: 'Put on your favorite music and dance',
        duration: ACTIVITY_DURATIONS.QUICK,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Exercise', 'Joy', 'Energy boost'],
        indoor: true,
      }
    ],
    rainy: [
      {
        id: 'baking',
        title: 'Bake Something',
        description: 'Try a new recipe or bake your favorite treat',
        duration: ACTIVITY_DURATIONS.LONG,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Creativity', 'Achievement', 'Comfort'],
        indoor: true,
      },
      {
        id: 'craft_project',
        title: 'Start a Craft Project',
        description: 'Channel your energy into something creative',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Creativity', 'Focus', 'Achievement'],
        indoor: true,
      }
    ],
    windy: [
      {
        id: 'fly_kite',
        title: 'Fly a Kite',
        description: 'Perfect weather for kite flying!',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Fun', 'Fresh air', 'Play'],
        indoor: false,
      }
    ]
  },
  
  anxious: {
    sunny: [
      {
        id: 'mindful_breathing',
        title: 'Outdoor Breathing Exercise',
        description: 'Find a quiet spot for deep breathing',
        duration: ACTIVITY_DURATIONS.QUICK,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Calming', 'Mindfulness', 'Fresh air'],
        indoor: false,
      },
      {
        id: 'gentle_yoga',
        title: 'Gentle Outdoor Yoga',
        description: 'Practice simple yoga poses in nature',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Relaxation', 'Movement', 'Grounding'],
        indoor: false,
      }
    ],
    cloudy: [
      {
        id: 'journaling',
        title: 'Mindful Journaling',
        description: 'Write down your thoughts and feelings',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Self-reflection', 'Clarity', 'Relief'],
        indoor: true,
      }
    ],
    rainy: [
      {
        id: 'tea_meditation',
        title: 'Tea Meditation',
        description: 'Practice mindfulness while enjoying tea',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Calming', 'Mindfulness', 'Self-care'],
        indoor: true,
      }
    ],
    windy: [
      {
        id: 'cozy_reading',
        title: 'Cozy Reading Session',
        description: 'Find a comfortable spot with a good book',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Distraction', 'Comfort', 'Relaxation'],
        indoor: true,
      }
    ]
  },

  tired: {
    sunny: [
      {
        id: 'sun_break',
        title: 'Quick Sun Break',
        description: 'Take a 10-minute break in the sunshine',
        duration: ACTIVITY_DURATIONS.QUICK,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Energy boost', 'Vitamin D', 'Fresh air'],
        indoor: false,
      },
      {
        id: 'stretching',
        title: 'Outdoor Stretching',
        description: 'Do some gentle stretches in the fresh air',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Energy', 'Flexibility', 'Awakening'],
        indoor: false,
      }
    ],
    cloudy: [
      {
        id: 'power_nap',
        title: 'Power Nap',
        description: 'Take a short refreshing nap',
        duration: ACTIVITY_DURATIONS.QUICK,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Rest', 'Rejuvenation', 'Energy'],
        indoor: true,
      }
    ],
    rainy: [
      {
        id: 'relaxing_bath',
        title: 'Relaxing Bath',
        description: 'Take a warm bath with calming scents',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Relaxation', 'Self-care', 'Comfort'],
        indoor: true,
      }
    ],
    windy: [
      {
        id: 'energy_smoothie',
        title: 'Make an Energy Smoothie',
        description: 'Blend a nutritious energy-boosting smoothie',
        duration: ACTIVITY_DURATIONS.QUICK,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Nutrition', 'Energy', 'Self-care'],
        indoor: true,
      }
    ]
  },

  calm: {
    sunny: [
      {
        id: 'garden_mindfulness',
        title: 'Garden Mindfulness',
        description: 'Spend time tending to plants mindfully',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Nature connection', 'Mindfulness', 'Peace'],
        indoor: false,
      },
      {
        id: 'TTTT',
        title: 'TTTT TTTT',
        description: 'Spend time tending to plants mindfully',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Nature connection', 'Mindfulness', 'Peace'],
        indoor: false,
      }
    ],
    cloudy: [
      {
        id: 'cloud_watching',
        title: 'Cloud Watching',
        description: 'Find a comfortable spot to watch the clouds',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Relaxation', 'Mindfulness', 'Peace'],
        indoor: false,
      }
    ],
    rainy: [
      {
        id: 'rain_meditation',
        title: 'Rain Meditation',
        description: 'Meditate to the sound of rainfall',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Peace', 'Mindfulness', 'Connection'],
        indoor: true,
      }
    ],
    windy: [
      {
        id: 'wind_chimes',
        title: 'Listen to Wind Chimes',
        description: 'Practice mindful listening with wind chimes',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.MEDIUM,
        benefits: ['Mindfulness', 'Peace', 'Present moment'],
        indoor: true,
      }
    ]
  },

  energetic: {
    sunny: [
      {
        id: 'hiit_workout',
        title: 'Outdoor HIIT Workout',
        description: 'Do a high-intensity interval training session',
        duration: ACTIVITY_DURATIONS.SHORT,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Exercise', 'Energy release', 'Endorphins'],
        indoor: false,
      }
    ],
    cloudy: [
      {
        id: 'dance_workout',
        title: 'Dance Workout',
        description: 'Follow an energetic dance workout video',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Fun', 'Exercise', 'Expression'],
        indoor: true,
      }
    ],
    rainy: [
      {
        id: 'indoor_exercise',
        title: 'Living Room Workout',
        description: 'Do a full-body workout at home',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Strength', 'Energy release', 'Achievement'],
        indoor: true,
      }
    ],
    windy: [
      {
        id: 'run_intervals',
        title: 'Running Intervals',
        description: 'Do interval training in the wind',
        duration: ACTIVITY_DURATIONS.MEDIUM,
        impact: MOOD_IMPACT.HIGH,
        benefits: ['Cardio', 'Challenge', 'Achievement'],
        indoor: false,
      }
    ]
  }
};