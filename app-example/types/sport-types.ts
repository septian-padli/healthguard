export type SportType = 'running' | 'bicycle';

export interface AccelerometerData {
  x: number;
  y: number;
  z: number;
}

export interface SportStats {
  steps: number;
  distance: number;
  calories: number;
  duration: number;
  averagePace: string;
}

export interface SportState {
  steps: number;
  isCounting: boolean;
  lastY: number | null;
  lastTimestamp: number | null;
  isRunning: boolean;
  milliseconds: number;
}