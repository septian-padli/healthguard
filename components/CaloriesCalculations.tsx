import React from 'react';
// Import constants dan types
import { SPORT_CONSTANTS } from '@/app-example/constants/Sports';
import { SportType } from '@/app-example/types/sport-types';
import { millisecondsToHours } from '@/app-example/utils/DurationUtils';

import { Text, View } from 'react-native';


/**
 * Calculate estimated calories burned based on steps
 */
export const calculateCaloriesFromSteps = (steps: number): number => {
  return steps * SPORT_CONSTANTS.CALORIES_PER_STEP;
};

/**
 * Calculate calories burned for bicycle based on time and intensity
 */
export const calculateCaloriesFromBicycle = (milliseconds: number, intensity: 'low' | 'medium' | 'high' = 'medium'): number => {
  const timeHours = millisecondsToHours(milliseconds);
  const caloriesPerHour = {
    low: 240,     // 4 cal/min
    medium: 360,  // 6 cal/min  
    high: 480     // 8 cal/min
  };
  
  return timeHours * caloriesPerHour[intensity];
};

/**
 * Calculate total calories based on sport type
 */
export const calculateTotalCalories = (
  sportType: SportType, 
  steps: number, 
  milliseconds: number,
  intensity: 'low' | 'medium' | 'high' = 'medium'
): number => {
  if (sportType === 'bicycle') {
    return calculateCaloriesFromBicycle(milliseconds, intensity);
  } else {
    return calculateCaloriesFromSteps(steps);
  }
};

/**
 * Format calories for display with target
 */
export const formatCaloriesWithTarget = (calories: number, target: number = 500): string => {
  return `${calories.toFixed(0)} / ${target} Kal`;
};

/**
 * Component untuk menampilkan kalori
 */
interface CaloriesDisplayProps {
  sportType: SportType;
  steps: number;
  milliseconds: number;
  target?: number;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
  showTarget?: boolean;
}

export const CaloriesDisplay: React.FC<CaloriesDisplayProps> = ({ 
  sportType, 
  steps, 
  milliseconds, 
  target = 500,
  intensity = 'medium',
  className,
  showTarget = true 
}) => {
  const calories = calculateTotalCalories(sportType, steps, milliseconds, intensity);
  
  return (
    <Text className={className}>
      {showTarget ? formatCaloriesWithTarget(calories, target) : `${calories.toFixed(0)} Kal`}
    </Text>
  );
};