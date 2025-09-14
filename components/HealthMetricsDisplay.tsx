import { HealthMetricsProps } from '@/app-example/types/health-types';
import { calculateBloodPressure } from '@/components/BloodPressureCalculations';
import { calculateCadence } from '@/components/CadenceCalculations';
import { calculateHeartRate } from '@/components/HeartRateCalculations';
import { calculateSpO2 } from '@/components/SpO2Calculations';
import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native';

export const HeartRateDisplay: React.FC<HealthMetricsProps> = ({
  sportType,
  steps,
  milliseconds,
  className,
}) => {
  const [displayedValue, setDisplayedValue] = useState<number>(0);
  const [values, setValues] = useState<number[]>([]);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (steps >= 5 && milliseconds >= 5000) {
      const currentTime = Date.now();
      
      // Update setiap 3 detik untuk smoothing
      if (currentTime - lastUpdateRef.current >= 3000) {
        const newValue = calculateHeartRate(sportType, steps, milliseconds);
        
        setValues(prev => {
          const newValues = [...prev, newValue].slice(-3); // Keep last 3 values
          const average = newValues.reduce((sum, val) => sum + val, 0) / newValues.length;
          setDisplayedValue(Math.round(average));
          return newValues;
        });
        
        lastUpdateRef.current = currentTime;
      }
      
      // Jika pertama kali memenuhi syarat, langsung tampil
      if (displayedValue === 0) {
        const newValue = calculateHeartRate(sportType, steps, milliseconds);
        setDisplayedValue(newValue);
        setValues([newValue]);
        lastUpdateRef.current = currentTime;
      }
    } else {
      setDisplayedValue(0);
      setValues([]);
      lastUpdateRef.current = 0;
    }
  }, [sportType, steps, milliseconds, displayedValue]);

  return <Text className={className}>{displayedValue} bpm</Text>;
};

export const SpO2Display: React.FC<HealthMetricsProps> = ({
  sportType,
  steps,
  milliseconds,
  className,
}) => {
  const [displayedValue, setDisplayedValue] = useState<number>(0);
  const [values, setValues] = useState<number[]>([]);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (steps >= 5 && milliseconds >= 5000) {
      const currentTime = Date.now();
      
      if (currentTime - lastUpdateRef.current >= 3000) {
        const newValue = calculateSpO2(sportType, steps, milliseconds);
        
        setValues(prev => {
          const newValues = [...prev, newValue].slice(-3);
          const average = newValues.reduce((sum, val) => sum + val, 0) / newValues.length;
          setDisplayedValue(Math.round(average));
          return newValues;
        });
        
        lastUpdateRef.current = currentTime;
      }
      
      if (displayedValue === 0) {
        const newValue = calculateSpO2(sportType, steps, milliseconds);
        setDisplayedValue(newValue);
        setValues([newValue]);
        lastUpdateRef.current = currentTime;
      }
    } else {
      setDisplayedValue(0);
      setValues([]);
      lastUpdateRef.current = 0;
    }
  }, [sportType, steps, milliseconds, displayedValue]);

  return <Text className={className}>{displayedValue}%</Text>;
};

export const BloodPressureDisplay: React.FC<HealthMetricsProps> = ({
  sportType,
  steps,
  milliseconds,
  className,
}) => {
  const [displayedValue, setDisplayedValue] = useState<{systolic: number, diastolic: number}>({systolic: 0, diastolic: 0});
  const [values, setValues] = useState<{systolic: number, diastolic: number}[]>([]);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (steps >= 5 && milliseconds >= 5000) {
      const currentTime = Date.now();
      
      if (currentTime - lastUpdateRef.current >= 3000) {
        const newValue = calculateBloodPressure(sportType, steps, milliseconds);
        
        setValues(prev => {
          const newValues = [...prev, newValue].slice(-3);
          const avgSystolic = newValues.reduce((sum, val) => sum + val.systolic, 0) / newValues.length;
          const avgDiastolic = newValues.reduce((sum, val) => sum + val.diastolic, 0) / newValues.length;
          setDisplayedValue({systolic: Math.round(avgSystolic), diastolic: Math.round(avgDiastolic)});
          return newValues;
        });
        
        lastUpdateRef.current = currentTime;
      }
      
      if (displayedValue.systolic === 0) {
        const newValue = calculateBloodPressure(sportType, steps, milliseconds);
        setDisplayedValue(newValue);
        setValues([newValue]);
        lastUpdateRef.current = currentTime;
      }
    } else {
      setDisplayedValue({systolic: 0, diastolic: 0});
      setValues([]);
      lastUpdateRef.current = 0;
    }
  }, [sportType, steps, milliseconds, displayedValue]);

  return <Text className={className}>{displayedValue.systolic}/{displayedValue.diastolic} mmHg</Text>;
};

export const CadenceDisplay: React.FC<HealthMetricsProps> = ({
  sportType,
  steps,
  milliseconds,
  className,
}) => {
  const [displayedValue, setDisplayedValue] = useState<number>(0);
  const [values, setValues] = useState<number[]>([]);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (steps >= 5 && milliseconds >= 5000) {
      const currentTime = Date.now();
      
      if (currentTime - lastUpdateRef.current >= 3000) {
        const newValue = calculateCadence(sportType, steps, milliseconds);
        
        setValues(prev => {
          const newValues = [...prev, newValue].slice(-3);
          const average = newValues.reduce((sum, val) => sum + val, 0) / newValues.length;
          setDisplayedValue(Math.round(average));
          return newValues;
        });
        
        lastUpdateRef.current = currentTime;
      }
      
      if (displayedValue === 0) {
        const newValue = calculateCadence(sportType, steps, milliseconds);
        setDisplayedValue(newValue);
        setValues([newValue]);
        lastUpdateRef.current = currentTime;
      }
    } else {
      setDisplayedValue(0);
      setValues([]);
      lastUpdateRef.current = 0;
    }
  }, [sportType, steps, milliseconds, displayedValue]);

  return <Text className={className}>{displayedValue}</Text>;
};