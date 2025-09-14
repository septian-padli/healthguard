import { SportType } from '@/app-example/types/sport-types';
import { millisecondsToMinutes } from '@/app-example/utils/DurationUtils';
import { ExerciseIntensity } from '@/app-example/types/health-types';

export const getExerciseIntensity = (
  sportType: SportType,
  steps: number,
  timeMinutes: number
): ExerciseIntensity => {
  if (timeMinutes === 0) return 'light';
  
  if (sportType === 'bicycle') {
    // Duration-based intensity for cycling
    if (timeMinutes < 10) return 'light';
    if (timeMinutes < 30) return 'moderate';
    return 'vigorous';
  }
  
  // Steps per minute for running/walking
  const stepsPerMinute = steps / timeMinutes;
  
  if (stepsPerMinute < 80) return 'light';    // Walking
  if (stepsPerMinute < 140) return 'moderate'; // Jogging  
  return 'vigorous';                          // Running
};

export const getFatigueMultiplier = (timeMinutes: number): number => {
  // Gradual increase in fatigue over time
  return Math.min(1.15, 1 + (timeMinutes / 60) * 0.1);
};

export const getRandomVariation = (range: number = 2): number => {
  return Math.floor(Math.random() * (range * 2 + 1)) - range;
};