import React from "react";
import { Text } from "react-native";

// Import constants and types
import { SPORT_CONSTANTS } from "@/app-example/constants/Sports";
import { SportType } from "@/app-example/types/sport-types";

// Import utility functions
import {
  millisecondsToHours,
  millisecondsToMinutes,
} from "@/app-example/utils/DurationUtils";

// Interface for component props
interface PaceDisplayProps {
  sportType: SportType;
  steps: number;
  milliseconds: number;
  className?: string;
}

// Interface for tracking pace readings
interface PaceWindow {
  timestamp: number;
  distance: number;
  steps: number;
}

// Interface for split tracking
interface Split {
  kmMark: number;
  timeAtMark: number;
  pace: string;
  stepsAtMark: number;
}

// IMPROVED Thresholds - yang lebih masuk akal
const MIN_STEPS_FOR_PACE = 30; // Naikin dari 3 ke 30
const MIN_DURATION_MS = 15000; // Naikin dari 5 detik ke 15 detik
const MIN_DISTANCE_KM = 0.02; // Naikin dari 0.006 ke 0.02 (20 meter)
const PACE_WINDOW_SIZE = 30000; // 30 seconds rolling window
const INSTANT_PACE_WINDOW = 10000; // 10 seconds for instant pace
const MIN_STEPS_PER_MINUTE = 10; // Minimal 10 steps per menit buat dianggap bergerak

// Function to check if user is actually moving
const isUserMoving = (steps: number, milliseconds: number): boolean => {
  if (milliseconds === 0) return false;
  const timeMinutes = milliseconds / 1000 / 60;
  const stepsPerMinute = steps / timeMinutes;
  return stepsPerMinute >= MIN_STEPS_PER_MINUTE;
};

// IMPROVED Function to estimate stride length based on speed
const estimateStrideLength = (steps: number, milliseconds: number): number => {
  const timeSeconds = milliseconds / 1000;
  if (timeSeconds === 0 || steps === 0) return 0.65; // Lebih konservatif

  // Hitung cadence (steps per minute)
  const stepsPerMinute = (steps / timeSeconds) * 60;
  
  // Stride length berdasarkan cadence yang lebih realistic
  if (stepsPerMinute > 180) return 0.9; // Very fast running
  if (stepsPerMinute > 160) return 0.8; // Fast running  
  if (stepsPerMinute > 140) return 0.75; // Moderate running
  if (stepsPerMinute > 120) return 0.7; // Slow jogging
  if (stepsPerMinute > 100) return 0.68; // Fast walking
  return 0.65; // Normal walking
};

// Function to get distance in kilometers
export const getDistanceInKm = (
  sportType: SportType,
  steps: number,
  milliseconds: number
): number => {
  if (sportType === "bicycle") {
    const timeHours = millisecondsToHours(milliseconds);
    if (timeHours === 0) return 0;
    const assumedSpeed = 20;
    return assumedSpeed * timeHours;
  }

  const estimatedStrideLength = estimateStrideLength(steps, milliseconds);
  return (steps * estimatedStrideLength) / 1000;
};

// FIXED: Original average pace calculation dengan validation yang lebih ketat
export const calculateAveragePace = (
  sportType: SportType,
  steps: number,
  milliseconds: number
): string => {
  if (!steps || !milliseconds || steps <= 0 || milliseconds <= 0) {
    return sportType === "bicycle" ? "0.0 km/h" : "--:--/km";
  }

  if (sportType === "bicycle") {
    const distanceKm = getDistanceInKm(sportType, steps, milliseconds);
    const timeHours = millisecondsToHours(milliseconds);
    if (timeHours > 0 && distanceKm > MIN_DISTANCE_KM) {
      const avgSpeed = distanceKm / timeHours;
      return `${avgSpeed.toFixed(1)} km/h`;
    }
    return "0.0 km/h";
  }

  // KEY FIX: Check if user is actually moving
  if (!isUserMoving(steps, milliseconds)) {
    return "--:--/km";
  }

  const distanceKm = getDistanceInKm(sportType, steps, milliseconds);
  const timeMinutes = millisecondsToMinutes(milliseconds);

  // Enhanced validation
  if (
    steps < MIN_STEPS_FOR_PACE ||
    milliseconds < MIN_DURATION_MS ||
    distanceKm < MIN_DISTANCE_KM
  ) {
    return "--:--/km";
  }

  if (distanceKm > 0 && timeMinutes > 0) {
    const paceMinPerKm = timeMinutes / distanceKm;

    // ADDED: Reasonable pace validation (3:00/km to 25:00/km)
    if (paceMinPerKm < 3 || paceMinPerKm > 25) {
      return "--:--/km";
    }

    const mins = Math.floor(paceMinPerKm);
    const secs = Math.round((paceMinPerKm - mins) * 60);

    const finalSecs = secs >= 60 ? 59 : secs;
    const finalMins = secs >= 60 ? mins + 1 : mins;

    return `${finalMins}:${finalSecs.toString().padStart(2, "0")}/km`;
  }

  return "--:--/km";
};

// IMPROVED: Rolling average pace calculation
export const calculateRollingPace = (
  sportType: SportType,
  steps: number,
  milliseconds: number,
  previousReadings: PaceWindow[] = []
): { pace: string; newReadings: PaceWindow[] } => {
  if (sportType === "bicycle") {
    const speed = calculateSpeedKmh(sportType, steps, milliseconds);
    return { pace: speed, newReadings: [] };
  }

  // Check if user is moving
  if (!isUserMoving(steps, milliseconds)) {
    return { pace: "--:--/km", newReadings: previousReadings };
  }

  const currentDistance = getDistanceInKm(sportType, steps, milliseconds);
  const currentTime = Date.now();
  
  // Add current reading
  const newReading: PaceWindow = {
    timestamp: currentTime,
    distance: currentDistance,
    steps: steps
  };
  
  // Filter out readings older than window size
  const validReadings = previousReadings.filter(
    reading => currentTime - reading.timestamp <= PACE_WINDOW_SIZE
  );
  
  const allReadings = [...validReadings, newReading];
  
  if (allReadings.length < 2) {
    return { pace: "--:--/km", newReadings: allReadings };
  }
  
  // Calculate pace based on distance covered in the window
  const oldestReading = allReadings[0];
  const distanceCovered = currentDistance - oldestReading.distance;
  const timeCovered = (currentTime - oldestReading.timestamp) / 1000 / 60; // minutes
  const stepsCovered = steps - oldestReading.steps;
  
  // Enhanced validation for rolling pace
  if (
    distanceCovered <= 0 || 
    timeCovered <= 0 || 
    stepsCovered < 20 || // At least 20 steps in window
    distanceCovered < 0.01 // At least 10 meters
  ) {
    return { pace: "--:--/km", newReadings: allReadings };
  }
  
  const currentPace = timeCovered / distanceCovered;
  
  // Reasonable pace range check
  if (currentPace < 3 || currentPace > 25) {
    return { pace: "--:--/km", newReadings: allReadings };
  }
  
  const mins = Math.floor(currentPace);
  const secs = Math.round((currentPace - mins) * 60);
  
  const finalSecs = secs >= 60 ? 59 : secs;
  const finalMins = secs >= 60 ? mins + 1 : mins;
  
  return {
    pace: `${finalMins}:${finalSecs.toString().padStart(2, "0")}/km`,
    newReadings: allReadings
  };
};

// IMPROVED: Instant pace calculation dengan better validation
export const calculateInstantPace = (
  sportType: SportType,
  currentSteps: number,
  currentTime: number,
  previousSteps: number = 0,
  previousTime: number = 0
): string => {
  if (sportType === "bicycle") {
    if (previousTime === 0) return "0.0 km/h";
    const timeDiff = currentTime - previousTime;
    const timeHours = timeDiff / 1000 / 60 / 60;
    const distanceDiff = getDistanceInKm(sportType, currentSteps - previousSteps, timeDiff);
    
    if (timeHours > 0 && distanceDiff > 0) {
      const speed = distanceDiff / timeHours;
      return `${speed.toFixed(1)} km/h`;
    }
    return "0.0 km/h";
  }

  if (previousSteps === 0 || previousTime === 0) {
    return "--:--/km";
  }
  
  const stepsDiff = currentSteps - previousSteps;
  const timeDiff = currentTime - previousTime;
  
  // Enhanced validation for instant pace
  if (
    stepsDiff <= 0 || 
    timeDiff <= 0 || 
    stepsDiff < 5 || // At least 5 steps difference
    timeDiff < 2000 // At least 2 seconds difference
  ) {
    return "--:--/km";
  }
  
  // Check if movement is significant enough
  const timeMinutes = timeDiff / 1000 / 60;
  const stepsPerMinute = stepsDiff / timeMinutes;
  if (stepsPerMinute < MIN_STEPS_PER_MINUTE) {
    return "--:--/km";
  }
  
  const distanceKm = getDistanceInKm(sportType, stepsDiff, timeDiff);
  
  if (distanceKm > 0 && timeMinutes > 0) {
    const pace = timeMinutes / distanceKm;
    
    // Reasonable pace range
    if (pace < 3 || pace > 25) {
      return "--:--/km";
    }
    
    const mins = Math.floor(pace);
    const secs = Math.round((pace - mins) * 60);
    
    const finalSecs = secs >= 60 ? 59 : secs;
    const finalMins = secs >= 60 ? mins + 1 : mins;
    
    return `${finalMins}:${finalSecs.toString().padStart(2, "0")}/km`;
  }
  
  return "--:--/km";
};

// Split-based pace tracking (unchanged, works fine)
export const calculateSplitPace = (
  sportType: SportType,
  steps: number,
  milliseconds: number,
  previousSplits: Split[] = []
): { currentPace: string; splits: Split[]; lastKmPace: string } => {
  const totalDistance = getDistanceInKm(sportType, steps, milliseconds);
  const currentKm = Math.floor(totalDistance);
  
  // Check if we've completed a new kilometer
  const lastSplit = previousSplits[previousSplits.length - 1];
  const lastCompletedKm = lastSplit ? lastSplit.kmMark : 0;
  
  if (currentKm > lastCompletedKm) {
    // Calculate pace for the last completed kilometer
    const prevTime = lastSplit ? lastSplit.timeAtMark : 0;
    const timeDiff = milliseconds - prevTime;
    const paceMinutes = timeDiff / 1000 / 60; // Convert to minutes
    
    const mins = Math.floor(paceMinutes);
    const secs = Math.round((paceMinutes - mins) * 60);
    
    const finalSecs = secs >= 60 ? 59 : secs;
    const finalMins = secs >= 60 ? mins + 1 : mins;
    
    const paceString = `${finalMins}:${finalSecs.toString().padStart(2, "0")}/km`;
    
    const newSplit: Split = {
      kmMark: currentKm,
      timeAtMark: milliseconds,
      pace: paceString,
      stepsAtMark: steps
    };
    
    const updatedSplits = [...previousSplits, newSplit];
    
    return {
      currentPace: paceString,
      splits: updatedSplits,
      lastKmPace: paceString
    };
  }
  
  // Calculate pace for current partial kilometer
  const prevTime = lastSplit ? lastSplit.timeAtMark : 0;
  const timeDiff = milliseconds - prevTime;
  const remainingDistance = totalDistance - lastCompletedKm;
  
  if (remainingDistance > 0.1 && timeDiff > 0) { // At least 100m covered
    const partialPaceMinutes = (timeDiff / 1000 / 60) / remainingDistance;
    const mins = Math.floor(partialPaceMinutes);
    const secs = Math.round((partialPaceMinutes - mins) * 60);
    
    const finalSecs = secs >= 60 ? 59 : secs;
    const finalMins = secs >= 60 ? mins + 1 : mins;
    
    const currentPaceString = `${finalMins}:${finalSecs.toString().padStart(2, "0")}/km`;
    
    return {
      currentPace: currentPaceString,
      splits: previousSplits,
      lastKmPace: lastSplit ? lastSplit.pace : "--:--/km"
    };
  }
  
  // Return the last calculated pace if not enough distance covered
  return {
    currentPace: lastSplit ? lastSplit.pace : "--:--/km",
    splits: previousSplits,
    lastKmPace: lastSplit ? lastSplit.pace : "--:--/km"
  };
};

// IMPROVED: Function to calculate speed in km/h
export const calculateSpeedKmh = (
  sportType: SportType,
  steps: number,
  milliseconds: number
): string => {
  if (!steps || !milliseconds || steps <= 0 || milliseconds <= 0) {
    return "0.0 km/h";
  }

  // Check if user is moving
  if (!isUserMoving(steps, milliseconds)) {
    return "0.0 km/h";
  }

  const distanceKm = getDistanceInKm(sportType, steps, milliseconds);
  const timeHours = millisecondsToHours(milliseconds);

  if (
    steps < MIN_STEPS_FOR_PACE ||
    milliseconds < MIN_DURATION_MS ||
    distanceKm < MIN_DISTANCE_KM
  ) {
    return "0.0 km/h";
  }

  if (timeHours > 0 && distanceKm > 0) {
    const speed = distanceKm / timeHours;
    return `${speed.toFixed(1)} km/h`;
  }

  return "0.0 km/h";
};

// Utility functions (unchanged)
export const speedToPace = (speedKmh: number): string => {
  if (speedKmh <= 0) return "--:--/km";
  const paceMinPerKm = 60 / speedKmh;
  const mins = Math.floor(paceMinPerKm);
  const secs = Math.round((paceMinPerKm - mins) * 60);
  const finalSecs = secs >= 60 ? 59 : secs;
  const finalMins = secs >= 60 ? mins + 1 : mins;
  return `${finalMins}:${finalSecs.toString().padStart(2, "0")}/km`;
};

export const paceToSpeed = (paceString: string): number => {
  const match = paceString.match(/^(\d+):(\d+)\/km$/);
  if (!match) return 0;
  const mins = parseInt(match[1]);
  const secs = parseInt(match[2]);
  const totalMinutes = mins + secs / 60;
  if (totalMinutes <= 0) return 0;
  return 60 / totalMinutes;
};

export const getAverageSpeedKmh = (
  sportType: SportType,
  steps: number,
  milliseconds: number
): number => {
  if (
    steps < MIN_STEPS_FOR_PACE || 
    milliseconds < MIN_DURATION_MS ||
    !isUserMoving(steps, milliseconds)
  ) {
    return 0;
  }
  const distanceKm = getDistanceInKm(sportType, steps, milliseconds);
  const timeHours = millisecondsToHours(milliseconds);
  if (timeHours > 0 && distanceKm > MIN_DISTANCE_KM) {
    const speed = distanceKm / timeHours;
    return speed;
  }
  return 0;
};

// Display Components (unchanged interfaces, improved logic)
export const PaceDisplay: React.FC<PaceDisplayProps> = ({
  sportType,
  steps,
  milliseconds,
  className,
}) => {
  const pace = calculateAveragePace(sportType, steps, milliseconds);
  return <Text className={className}>{pace}</Text>;
};

export const SpeedDisplay: React.FC<PaceDisplayProps> = ({
  sportType,
  steps,
  milliseconds,
  className,
}) => {
  const speed = calculateSpeedKmh(sportType, steps, milliseconds);
  return <Text className={className}>{speed}</Text>;
};

// Real-time pace display component (improved validation)
interface RealTimePaceDisplayProps extends PaceDisplayProps {
  previousReadings?: PaceWindow[];
  onReadingsUpdate?: (readings: PaceWindow[]) => void;
}

export const RealTimePaceDisplay: React.FC<RealTimePaceDisplayProps> = ({
  sportType,
  steps,
  milliseconds,
  className,
  previousReadings = [],
  onReadingsUpdate,
}) => {
  const { pace, newReadings } = calculateRollingPace(
    sportType,
    steps,
    milliseconds,
    previousReadings
  );
  
  // Update readings if callback provided
  if (onReadingsUpdate) {
    onReadingsUpdate(newReadings);
  }
  
  return <Text className={className}>{pace}</Text>;
};

// Split pace display component (unchanged)
interface SplitPaceDisplayProps extends PaceDisplayProps {
  previousSplits?: Split[];
  onSplitsUpdate?: (splits: Split[]) => void;
  showLastKmPace?: boolean;
}

export const SplitPaceDisplay: React.FC<SplitPaceDisplayProps> = ({
  sportType,
  steps,
  milliseconds,
  className,
  previousSplits = [],
  onSplitsUpdate,
  showLastKmPace = false,
}) => {
  const { currentPace, splits, lastKmPace } = calculateSplitPace(
    sportType,
    steps,
    milliseconds,
    previousSplits
  );
  
  // Update splits if callback provided
  if (onSplitsUpdate) {
    onSplitsUpdate(splits);
  }
  
  const displayPace = showLastKmPace ? lastKmPace : currentPace;
  return <Text className={className}>{displayPace}</Text>;
};