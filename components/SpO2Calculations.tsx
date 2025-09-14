import { SportType } from '@/app-example/types/sport-types';
import { millisecondsToMinutes } from '@/app-example/utils/DurationUtils';
import { HEALTH_CONSTANTS } from '@/app-example/constants/Healths';
import { getExerciseIntensity, getRandomVariation } from '@/app-example/utils/HealthMetricsUtils';

export const calculateSpO2 = (
  sportType: SportType,
  steps: number,
  milliseconds: number
): number => {
  const timeMinutes = millisecondsToMinutes(milliseconds);
  const intensity = getExerciseIntensity(sportType, steps, timeMinutes);
  
  const baseSpO2 = 99; // Normal resting SpO2
  const exerciseImpact = HEALTH_CONSTANTS.SPO2.EXERCISE_IMPACT[intensity];
  const variation = getRandomVariation(1);
  
  const result = baseSpO2 + exerciseImpact + variation;
  
  return Math.max(92, Math.min(100, result));
};