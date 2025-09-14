import { SportType } from "./sport-types";

export interface HealthMetricsProps {
  sportType: SportType;
  steps: number;
  milliseconds: number;
  className?: string;
}

export interface BloodPressureResult {
  systolic: number;
  diastolic: number;
}

export interface HealthProfile {
  age: number;
  weight: number;
  height: number;
  restingHR: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
}

export type ExerciseIntensity = 'light' | 'moderate' | 'vigorous';