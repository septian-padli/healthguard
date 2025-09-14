import React from 'react';

// Import constants dan types
import { SPORT_CONSTANTS } from '@/app-example/constants/Sports';
import { SportType } from '@/app-example/types/sport-types';

// Import fungsi untuk menghitung jarak
import { millisecondsToHours, millisecondsToMinutes } from '@/app-example/utils/DurationUtils';
import { getDistanceInKm } from './DistanceCalculations';

// Buat nampilin pace
interface PaceDisplayProps {
  sportType: SportType;
  steps: number;
  milliseconds: number;
  className?: string;
}

// Fungsi buat menghitung pace rata-rata berdasarkan jenis olahraga, langkah, dan durasi
export const calculateAveragePace = (
  sportType: SportType, 
  steps: number, 
  milliseconds: number
): string => {
  if (sportType === 'bicycle') {
    const distanceKm = getDistanceInKm(sportType, steps, milliseconds);
    const timeHours = millisecondsToHours(milliseconds);
    if (timeHours > 0 && distanceKm > 0) {
      const avgSpeed = distanceKm / timeHours;
      return `${avgSpeed.toFixed(1)} km/h`;
    }
    return '0.0 km/h';
  } else {
    const distanceKm = (steps * SPORT_CONSTANTS.METERS_PER_STEP) / 1000;
    const timeMinutes = millisecondsToMinutes(milliseconds);
    if (distanceKm > 0) {
      const paceMinPerKm = timeMinutes / distanceKm;
      const mins = Math.floor(paceMinPerKm);
      const secs = Math.round((paceMinPerKm - mins) * 60);
      return `${mins}:${secs.toString().padStart(2, '0')}/km`;
    }
    return '0:00/km';
  }
};


// Fungsi buat menghitung kecepatan rata-rata dalam km/h
export const getAverageSpeedKmh = (
  sportType: SportType, 
  steps: number, 
  milliseconds: number
): number => {
  const distanceKm = getDistanceInKm(sportType, steps, milliseconds);
  const timeHours = millisecondsToHours(milliseconds);
  if (timeHours > 0 && distanceKm > 0) {
    return distanceKm / timeHours;
  }
  return 0;
};

// Komponen untuk menampilkan pace
export const PaceDisplay: React.FC<PaceDisplayProps> = ({ 
  sportType, 
  steps, 
  milliseconds, 
  className 
}) => {
  const pace = calculateAveragePace(sportType, steps, milliseconds);
  
  return (
    <span className={className}>
      {pace}
    </span>
  );
};