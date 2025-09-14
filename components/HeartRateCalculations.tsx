import { SportType } from '@/app-example/types/sport-types';
import { millisecondsToMinutes } from '@/app-example/utils/DurationUtils';
import { HealthProfile } from '@/app-example/types/health-types';
import { HEALTH_CONSTANTS } from '@/app-example/constants/Healths';
import { 
  getExerciseIntensity, 
  getFatigueMultiplier, 
  getRandomVariation 
} from '@/app-example/utils/HealthMetricsUtils';

export const calculateHeartRate = (
  sportType: SportType,
  steps: number,
  milliseconds: number,
  profile: HealthProfile = HEALTH_CONSTANTS.DEFAULT_PROFILE
): number => {
  if (milliseconds === 0) return profile.restingHR;
  
  const timeMinutes = millisecondsToMinutes(milliseconds);
  const intensity = getExerciseIntensity(sportType, steps, timeMinutes);
  
  const maxHR = HEALTH_CONSTANTS.HEART_RATE.MAX_HR_FORMULA - profile.age;
  const zone = HEALTH_CONSTANTS.HEART_RATE.INTENSITY_ZONES[intensity];
  
  // Calculate target heart rate
  const hrReserve = maxHR - profile.restingHR;
  const targetHRPercent = zone.min + (Math.random() * (zone.max - zone.min));
  const targetHR = profile.restingHR + (hrReserve * targetHRPercent);
  
  // Apply fatigue and fitness level adjustments
  const fatigueMultiplier = getFatigueMultiplier(timeMinutes);
  const fitnessAdjustment = profile.fitnessLevel === 'advanced' ? 0.9 : 
                           profile.fitnessLevel === 'intermediate' ? 0.95 : 1.0;
  
  const finalHR = targetHR * fatigueMultiplier * fitnessAdjustment;
  const variation = getRandomVariation(3);
  
  return Math.round(Math.max(profile.restingHR, finalHR + variation));
};