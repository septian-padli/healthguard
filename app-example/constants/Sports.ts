
// @message: "File ini berisi konstanta yang digunakan dalam aplikasi olahraga."
export const SPORT_CONSTANTS = {
     CALORIES_PER_STEP: 0.04, 
     METERS_PER_STEP: 0.6, // Data dari Google, Rata-rata panjang langkah kaki manusia sekitar 0.6 meter
     BICYCLE_SPEED_KMH: 15,
     STEP_THRESHOLD: 0.1,
     STEP_COOLDOWN: 800,
     COUNTING_TIMEOUT: 1200,
     EMERGENCY_STEP_LIMIT: 20
} as const;