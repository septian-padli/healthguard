import React from 'react';

// Import constants dan types
import { SPORT_CONSTANTS } from '@/app-example/constants/Sports';
import { SportType } from '@/app-example/types/sport-types';

// Interface jarak
interface DistanceDisplayProps {
  sportType: SportType;
  steps: number;
  milliseconds: number;
  className?: string;
  showUnit?: boolean;
}

// Hitung jarak berdasarkan jenis olahraga, langkah, dan durasi
export const calculateDistance = (
  sportType: SportType, 
  steps: number, 
  milliseconds: number
): number => {
  if (sportType === 'bicycle') {
    const timeHours = milliseconds / 3600000;
    const distanceMeters = timeHours * SPORT_CONSTANTS.BICYCLE_SPEED_KMH * 1000;
    return distanceMeters;
  } else {
    // Untuk lari hitung berdasarkan langkah
    return steps * SPORT_CONSTANTS.METERS_PER_STEP;
  }
};

// Format jarak ke string dengan satuan yang sesuai
export const formatDistance = (
  sportType: SportType, 
  steps: number, 
  milliseconds: number
): string => {
  const distanceMeters = calculateDistance(sportType, steps, milliseconds);
  if (distanceMeters >= 1000) {
    return `${(distanceMeters / 1000).toFixed(2)} km`;
  } else {
    return `${distanceMeters.toFixed(0)} m`;
  }
};

// jarak dalam kilometer
export const getDistanceInKm = (
  sportType: SportType, 
  steps: number, 
  milliseconds: number
): number => {
  return calculateDistance(sportType, steps, milliseconds) / 1000;
};


// Komponen untuk menampilkan jarak 
export const DistanceDisplay: React.FC<DistanceDisplayProps> = ({ 
  sportType, 
  steps, 
  milliseconds, 
  className,
  showUnit = true 
}) => {
  const distance = formatDistance(sportType, steps, milliseconds);
  
  return (
    <span className={className}>
      {showUnit ? distance : distance.split(' ')[0]}
    </span>
  );
};