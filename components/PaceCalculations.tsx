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

// Buat Thresholds
const MIN_STEPS_FOR_PACE = 3;
const MIN_DURATION_MS = 5000;
const MIN_DISTANCE_KM = 0.006;

// Fungsi untuk memperkirakan panjang langkah berdasarkan kecepatan
const estimateStrideLength = (steps: number, milliseconds: number): number => {
  const timeSeconds = milliseconds / 1000;
  if (timeSeconds === 0 || steps === 0) return 0.8;

  const meters = steps * SPORT_CONSTANTS.METERS_PER_STEP;
  const speedMps = meters / timeSeconds;

  if (speedMps > 3.0) return 1.2; // Fast running (> 10.8 km/h)
  if (speedMps > 2.0) return 1.0; // Running (7.2 - 10.8 km/h)
  if (speedMps > 1.0) return 0.9; // Jogging (3.6 - 7.2 km/h)
  return 0.8;
};

// Fungsi untuk mendapatkan jarak dalam kilometer (digunakan untuk kecepatan dan kelajuan)
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

  const distanceKm = getDistanceInKm(sportType, steps, milliseconds);
  const timeMinutes = millisecondsToMinutes(milliseconds);

  if (
    steps < MIN_STEPS_FOR_PACE ||
    milliseconds < MIN_DURATION_MS ||
    distanceKm < MIN_DISTANCE_KM
  ) {
    return "--:--/km";
  }

  if (distanceKm > 0 && timeMinutes > 0) {
    const paceMinPerKm = timeMinutes / distanceKm;

    const mins = Math.floor(paceMinPerKm);
    const secs = Math.round((paceMinPerKm - mins) * 60);

    const finalSecs = secs >= 60 ? 59 : secs;
    const finalMins = secs >= 60 ? mins + 1 : mins;

    return `${finalMins}:${finalSecs.toString().padStart(2, "0")}/km`;
  }

  return "--:--/km";
};

// Function to calculate speed in km/h
export const calculateSpeedKmh = (
  sportType: SportType,
  steps: number,
  milliseconds: number
): string => {
  if (!steps || !milliseconds || steps <= 0 || milliseconds <= 0) {
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
  if (steps < MIN_STEPS_FOR_PACE || milliseconds < MIN_DURATION_MS) {
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


// Display Components
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