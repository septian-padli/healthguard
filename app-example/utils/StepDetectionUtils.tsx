import React from 'react';
import { SPORT_CONSTANTS } from '@/app-example/constants/Sports';

// Interface untuk menampilkan jumlah langkah
interface StepCounterDisplayProps {
  steps: number;
  className?: string;
  showLabel?: boolean;
}

// Fungsi untuk mendeteksi langkah berdasarkan perubahan akselerasi pada sumbu Y
export const isStepDetected = (
  currentY: number,
  lastY: number | null,
  isCounting: boolean,
  lastTimestamp: number | null
): boolean => {
  const timestamp = new Date().getTime();
  return (
    Math.abs(currentY - (lastY ?? 0)) > SPORT_CONSTANTS.STEP_THRESHOLD &&
    !isCounting &&
    (lastTimestamp === null || (timestamp - lastTimestamp) > SPORT_CONSTANTS.STEP_COOLDOWN)
  );
};


// Funsgi buat menghitung frekuensi langkah (steps per minute)
export const calculateStepFrequency = (steps: number, milliseconds: number): number => {
  const minutes = milliseconds / 60000;
  return minutes > 0 ? steps / minutes : 0;
};


// Fungsi untuk mendapatkan sensitivitas langkah berdasarkan jenis olahraga
export const getStepSensitivity = (sportType: string): number => {
  switch (sportType) {
    case 'running':
      return 0.15; 
    default:
      return SPORT_CONSTANTS.STEP_THRESHOLD;
  }
};



// Komponen untuk menampilkan jumlah langkah
export const StepCounterDisplay: React.FC<StepCounterDisplayProps> = ({ 
  steps, 
  className,
  showLabel = false 
}) => {
  return (
    <span className={className}>
      {steps}{showLabel && ' langkah'}
    </span>
  );
};