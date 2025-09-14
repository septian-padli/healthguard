import { SportType } from '@/app-example/types/sport-types';
import { millisecondsToMinutes } from '@/app-example/utils/DurationUtils';
import { BloodPressureResult } from '@/app-example/types/health-types';
import { HEALTH_CONSTANTS } from '@/app-example/constants/Healths';
import { getExerciseIntensity, getRandomVariation } from '@/app-example/utils/HealthMetricsUtils';

export const calculateBloodPressure = (
  sportType: SportType,
  steps: number,
  milliseconds: number
): BloodPressureResult => {
  const timeMinutes = millisecondsToMinutes(milliseconds);
  const intensity = getExerciseIntensity(sportType, steps, timeMinutes);
  
  const { systolic: baseSys, diastolic: baseDia } = HEALTH_CONSTANTS.BLOOD_PRESSURE.NORMAL;
  const increase = HEALTH_CONSTANTS.BLOOD_PRESSURE.EXERCISE_INCREASE[intensity];
  
  const systolicVariation = getRandomVariation(3);
  const diastolicVariation = getRandomVariation(2);
  
  return {
    systolic: baseSys + increase.systolic + systolicVariation,
    diastolic: baseDia + increase.diastolic + diastolicVariation
  };
};