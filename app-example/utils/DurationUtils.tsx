import React from 'react';
import { Text, View } from 'react-native';

interface DurationDisplayProps {
  milliseconds: number;
  className?: string;
}

// Untuk Format milliseconds ke MM:SS:MS format
export const formatDuration = (ms: number): string => {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const centis = Math.floor((ms % 1000) / 10);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${centis.toString().padStart(2, '0')}`;
};

// Untuk Format milliseconds ke jam
export const millisecondsToHours = (ms: number): number => {
  return ms / 3600000;
};

// Untuk Format milliseconds ke menit
export const millisecondsToMinutes = (ms: number): number => {
  return ms / 60000;
};


// Komponen untuk menampilkan durasi dalam format MM:SS:MS
export const DurationDisplay: React.FC<DurationDisplayProps> = ({ milliseconds, className }) => {
  return (
    <View className={className }>
      <Text className="text-4xl font-jakartaExtraBold text-gray-900">{formatDuration(milliseconds)}</Text>
    </View>
  );
};