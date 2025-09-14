import { SportType } from '@/app-example/types/sport-types';
import { millisecondsToMinutes } from '@/app-example/utils/DurationUtils';

export const calculateCadence = (
  sportType: SportType,
  steps: number,
  milliseconds: number
): number => {
  if (milliseconds === 0 || sportType === 'bicycle') return 0;
  
  const timeMinutes = millisecondsToMinutes(milliseconds);
  if (timeMinutes === 0) return 0;
  
  return Math.round(steps / timeMinutes);
};