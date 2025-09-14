import React from "react";
import { Text, View } from "react-native";

interface DurationDisplayProps {
  milliseconds: number;
  className?: string;
}

// Format milliseconds ke MM:SS:MS (menit:detik:milidetik)
export const formatDurationMMSSMS = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsPart = Math.floor((ms % 1000) / 10); // Ambil 2 digit terakhir dari milidetik (00-99)

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${millisecondsPart.toString().padStart(2, "0")}`;
};

// BONUS: Format ke HH:MM:SS kalau lu butuh juga
export const formatDuration = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Format untuk centiseconds (sama kayak yang udah ada)
export const formatDurationWithCentiseconds = (ms: number): string => {
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const centis = Math.floor((ms % 1000) / 10);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${centis.toString().padStart(2, "0")}`;
};

// Helper functions (udah bener)
export const millisecondsToHours = (ms: number): number => {
  return ms / 3600000;
};

export const millisecondsToMinutes = (ms: number): number => {
  return ms / 60000;
};

export const millisecondsToSeconds = (ms: number): number => {
  return ms / 1000;
};

// Komponen untuk menampilkan durasi dalam format MM:SS:MS dengan UI yang selalu sejajar
export const DurationDisplay: React.FC<DurationDisplayProps> = ({
  milliseconds,
  className,
}) => {
  const formattedTime = formatDurationMMSSMS(milliseconds);
  const [minutes, seconds, ms] = formattedTime.split(":");

  return (
    <View className={`${className} flex-row items-center justify-center`}>
      {/* Bagian Menit */}
      <Text
        className="text-4xl font-jakartaExtraBold text-gray-900 text-center"
        style={{
          fontVariant: ["tabular-nums"], // Monospace numbers
          minWidth: 48, // Fixed width untuk 2 digit
          textAlign: "center",
        }}
      >
        {minutes}
      </Text>

      {/* Separator */}
      <Text className="text-4xl font-jakartaExtraBold text-gray-900 mx-1">
        :
      </Text>

      {/* Bagian Detik */}
      <Text
        className="text-4xl font-jakartaExtraBold text-gray-900 text-center"
        style={{
          fontVariant: ["tabular-nums"],
          minWidth: 48,
          textAlign: "center",
        }}
      >
        {seconds}
      </Text>

      {/* Separator */}
      <Text className="text-4xl font-jakartaExtraBold text-gray-900 mx-1">
        :
      </Text>

      {/* Bagian Milidetik */}
      <Text
        className="text-4xl font-jakartaExtraBold text-gray-900 text-center"
        style={{
          minWidth: 48,
          textAlign: "center",
        }}
      >
        {ms}
      </Text>
    </View>
  );
};

// BONUS: Versi alternatif dengan styling yang lebih compact
export const CompactDurationDisplay: React.FC<DurationDisplayProps> = ({
  milliseconds,
  className,
}) => {
  return (
    <View className={className}>
      <Text
        className="text-4xl font-jakartaExtraBold text-gray-900 text-center tracking-wider"
        style={{
          letterSpacing: 2, // Spacing antar karakter
        }}
      >
        {formatDurationMMSSMS(milliseconds)}
      </Text>
    </View>
  );
};

// BONUS: Versi dengan label
export const LabeledDurationDisplay: React.FC<DurationDisplayProps> = ({
  milliseconds,
  className,
}) => {
  const formattedTime = formatDurationMMSSMS(milliseconds);
  const [minutes, seconds, ms] = formattedTime.split(":");

  return (
    <View className={`${className}`}>
      {/* Main Timer */}
      <View className="flex-row items-center justify-center mb-2">
        <View className="items-center">
          <Text
            className="text-4xl font-jakartaExtraBold text-gray-900"
            style={{ minWidth: 48, textAlign: "center" }}
          >
            {minutes}
          </Text>
          <Text className="text-xs text-gray-500 font-jakartaMedium">MIN</Text>
        </View>

        <Text className="text-4xl font-jakartaExtraBold text-gray-900 mx-2">
          :
        </Text>

        <View className="items-center">
          <Text
            className="text-4xl font-jakartaExtraBold text-gray-900"
            style={{ minWidth: 48, textAlign: "center" }}
          >
            {seconds}
          </Text>
          <Text className="text-xs text-gray-500 font-jakartaMedium">SEC</Text>
        </View>

        <Text className="text-4xl font-jakartaExtraBold text-gray-900 mx-2">
          :
        </Text>

        <View className="items-center">
          <Text
            className="text-4xl font-jakartaExtraBold text-gray-900"
            style={{ minWidth: 48, textAlign: "center" }}
          >
            {ms}
          </Text>
          <Text className="text-xs text-gray-500 font-jakartaMedium">MS</Text>
        </View>
      </View>

      <Text className="text-base text-gray-600 font-jakarta text-center">
        Total Duration
      </Text>
    </View>
  );
};
