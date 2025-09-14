export const HEALTH_CONSTANTS = {
  DEFAULT_PROFILE: {
    age: 20,
    weight: 70,
    height: 173,
    restingHR: 75,
    fitnessLevel: 'beginner' as const
  },
  
  HEART_RATE: {
    MAX_HR_FORMULA: 220, // Standard formula: 220 - age
    INTENSITY_ZONES: {
      light: { min: 0.5, max: 0.6 },
      moderate: { min: 0.6, max: 0.7 },
      vigorous: { min: 0.7, max: 0.85 }
    }
  },
  
  SPO2: {
    NORMAL_RANGE: { min: 95, max: 100 },
    EXERCISE_IMPACT: {
      light: -1,    // 98%
      moderate: -3, // 96%
      vigorous: -5  // 94%
    }
  },
  
  BLOOD_PRESSURE: {
    NORMAL: { systolic: 120, diastolic: 80 },
    EXERCISE_INCREASE: {
      light: { systolic: 10, diastolic: 5 },
      moderate: { systolic: 20, diastolic: 10 },
      vigorous: { systolic: 35, diastolic: 15 }
    }
  },
  
  CADENCE: {
    WALKING: { min: 60, max: 100 },
    JOGGING: { min: 140, max: 160 },
    RUNNING: { min: 160, max: 200 }
  }
};