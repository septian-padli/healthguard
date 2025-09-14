//Merged SportTracker - Combines integrate-ai and feat-fatra features

import StatCard from "@/components/StatCard";
import { images } from "@/constants/images";
import { callDeepSeekAPI } from "@/utils/api-call-deepseek";
import {
  ArrowLeft01Icon,
  BloodPressureIcon,
  Fire03Icon,
  HeartCheckIcon,
  LungsIcon,
  PauseIcon,
  PlayIcon,
  Route01Icon,
  RunningShoesIcon,
  Time02Icon,
  BodyPartSixPackIcon,
  HeartAddIcon,
  Time03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  useFocusEffect,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Import from feat-fatra modular architecture (create these files if they don't exist)
import { SPORT_CONSTANTS } from "@/app-example/constants/Sports";
import { SportType, SportState } from "@/app-example/types/sport-types";
import { DurationDisplay } from "@/app-example/utils/DurationUtils";
import { DistanceDisplay } from "@/components/DistanceCalculations";
import { PaceDisplay } from "@/components/PaceCalculations";
import { CaloriesDisplay } from "@/components/CaloriesCalculations";
import {
  isStepDetected,
  StepCounterDisplay,
} from "@/app-example/utils/StepDetectionUtils";

const SportTracker: React.FC = () => {
  // Use modular state management from feat-fatra
  const [sportState, setSportState] = useState<SportState>({
    steps: 0,
    isCounting: false,
    lastY: 0,
    lastTimestamp: 0,
    isRunning: false,
    milliseconds: 0,
  });

  // AI integration states from integrate-ai
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bodyCondition, setBodyCondition] = useState("Semangat Olahraga");
  const [bodyConditionTrigger, setBodyConditionTrigger] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const sportType = useLocalSearchParams().sport as SportType;
  const imageSport =
    sportType === "running"
      ? images.runScreen
      : sportType === "bicycle"
        ? images.bicycleScreen
        : images.runScreen;

  const CALORIES_PER_STEP = 0.04;

  // Accelerometer effect with modular step detection
  useEffect(() => {
    let subscription: { remove: () => void } | null = null;
    if (sportState.isRunning) {
      Accelerometer.isAvailableAsync().then((result) => {
        if (result) {
          subscription = Accelerometer.addListener((accelerometerData) => {
            const { y } = accelerometerData;
            const timestamp = new Date().getTime();

            // Use modular step detection logic
            if (
              isStepDetected(
                y,
                sportState.lastY,
                sportState.isCounting,
                sportState.lastTimestamp
              )
            ) {
              setSportState((prev) => ({
                ...prev,
                isCounting: true,
                lastY: y,
                lastTimestamp: timestamp,
                steps: prev.steps + 1,
              }));

              setTimeout(() => {
                setSportState((prev) => ({
                  ...prev,
                  isCounting: false,
                }));
              }, SPORT_CONSTANTS.COUNTING_TIMEOUT || 1200);
            }
          });
        } else {
          console.log("Accelerometer not available on this device.");
        }
      });
    }
    return () => {
      if (subscription) {
        subscription.remove();
        subscription = null;
      }
    };
  }, [
    sportState.isRunning,
    sportState.isCounting,
    sportState.lastY,
    sportState.lastTimestamp,
  ]);

  // Back to start function from integrate-ai
  function backToStart() {
    setSportState((prev) => ({
      ...prev,
      isRunning: false,
      milliseconds: 0,
      steps: 0,
    }));
    router.push("/(tabs)/start");
  }

  // Stopwatch effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (sportState.isRunning) {
      timer = setInterval(() => {
        setSportState((prev) => ({
          ...prev,
          milliseconds: prev.milliseconds + 10,
        }));
      }, 10);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sportState.isRunning]);

  // Format duration function from integrate-ai
  const formatDuration = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${centis.toString().padStart(2, "0")}`;
  };

  // AI body condition monitoring from integrate-ai
  const statusConditionBody = async () => {
    const queryAi =
      sportType === "running"
        ? `Saya laki-laki berumur 20 tahun dengan berat badan 70 kg dan tinggi badan 173 cm dan tidak pernah berolahraga. Saya sedang berolahraga running. Saya sudah berjalan sebanyak ${sportState.steps} steps dengan durasi ${formatDuration(sportState.milliseconds)} jam. Bagaimana kondisi tubuh saya sekarang? Apakah normal, lelah, atau berbahaya? Berikan jawaban singkat hanya satu kata: normal, lelah, atau bahaya.`
        : `Saya laki-laki berumur 20 tahun dengan berat badan 70 kg dan tinggi badan 173 cm dan tidak pernah berolahraga. Saya sedang berolahraga bersepeda. Saya sudah bersepeda sebanyak ${sportState.steps} km dengan durasi ${formatDuration(sportState.milliseconds)}. Bagaimana kondisi tubuh saya sekarang? Apakah normal, lelah, atau berbahaya? Berikan jawaban singkat hanya satu kata: normal, lelah, atau bahaya.`;

    try {
      const result = await callDeepSeekAPI(queryAi);
      setBodyCondition(result?.trim() ?? "error");
      setBodyConditionTrigger((prev) => prev + 1);
    } catch (err) {
      console.error("API error:", err);
      setBodyCondition("error");
    }
  };

  // AI monitoring effect from integrate-ai
  useEffect(() => {
    if (
      sportState.steps > 0 &&
      sportState.steps % 5 === 0 &&
      pathname.includes("sport")
    ) {
      statusConditionBody();
    }
  }, [sportState.steps]);

  // Emergency detection from integrate-ai
  useEffect(() => {
    if (bodyCondition.includes("Bahaya")) {
      setSportState((prev) => ({ ...prev, isRunning: false }));
      router.push(
        `/emergency/waiting?duration=${encodeURIComponent(formatDuration(sportState.milliseconds))}&steps=${encodeURIComponent(sportState.steps)}&condition=${encodeURIComponent(bodyCondition)}`
      );
    }
  }, [bodyConditionTrigger]);

  // Hardware back button handler from integrate-ai
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!showConfirmModal) {
          setShowConfirmModal(true);
        }
        return true;
      };
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => sub.remove();
    }, [showConfirmModal])
  );

  const toggleTimer = () => {
    if (!sportState.isRunning) {
      // Reset when starting
      setSportState((prev) => ({
        ...prev,
        steps: 0,
        lastY: 0,
        lastTimestamp: 0,
        milliseconds: 0,
      }));
    }
    setSportState((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  };

  const estimatedCalories = sportState.steps * CALORIES_PER_STEP;

  return (
    <SafeAreaView className="flex-1 justify-end items-center bg-gray-50">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <Image
        source={imageSport}
        className="w-full aspect-video object-cover absolute -top-20 left-0"
      />

      {/* Back button from integrate-ai */}
      <TouchableOpacity
        onPress={() => setShowConfirmModal(true)}
        className="absolute top-12 left-4 bg-white rounded-full p-2"
      >
        <HugeiconsIcon
          strokeWidth={1.5}
          icon={ArrowLeft01Icon}
          className="text-gray-800"
          size={24}
        />
      </TouchableOpacity>

      <View className="flex justify-end items-center pb-10 pt-12 px-4 bg-white rounded-t-3xl relative z-10 w-full">
        <TouchableOpacity
          onPress={toggleTimer}
          className="bg-green-normal text-gray-800 aspect-square flex justify-center items-center py-4 mb-6 rounded-xl"
        >
          <HugeiconsIcon
            strokeWidth={3}
            icon={sportState.isRunning ? PauseIcon : PlayIcon}
            className="text-gray-800 mb-1"
            size={32}
          />
        </TouchableOpacity>

        <View className=" w-full mb-8 ">
          <View className="w-48 mx-auto flex flex-row justify-start pl-2">
            {/* Use modular duration display or fallback to inline */}
            {DurationDisplay ? (
              <DurationDisplay
                milliseconds={sportState.milliseconds}
                className="text-4xl font-jakartaExtraBold text-gray-900"
              />
            ) : (
              <Text className="text-4xl font-jakartaExtraBold text-gray-900">
                {formatDuration(sportState.milliseconds)}
              </Text>
            )}
          </View>
          <Text className="text-base font-jakartaMedium text-gray-700 text-center mb-1">
            Total Duration
          </Text>

          {/* AI body condition status from integrate-ai */}
          {bodyCondition.includes("Normal") ? (
            <Text className="text-base font-jakartaMedium text-gray-500 text-center">
              Ayo! Kamu pasti bisa!
            </Text>
          ) : bodyCondition.includes("Lelah") ? (
            <Text className="text-base font-jakartaMedium text-amber-600 text-center">
              Anda lelah, mari beristirahat sejenak
            </Text>
          ) : bodyCondition.includes("Bahaya") ? (
            <Text className="text-base font-jakartaMedium text-red-600 text-center">
              Dalam Bahaya! Segera cari bantuan.
            </Text>
          ) : (
            <Text className="text-base font-jakartaMedium text-gray-500 text-center">
              Semangat Olahraga!
            </Text>
          )}
        </View>

        <View className=" w-full h-fit mb-8">
          <View className="flex flex-row flex-wrap">
            <StatCard
              bgColor="bg-orange-50"
              bgIcon="bg-orange-500"
              title="Kalori"
              value={
                CaloriesDisplay ? (
                  <CaloriesDisplay
                    sportType={sportType}
                    steps={sportState.steps}
                    milliseconds={sportState.milliseconds}
                  />
                ) : (
                  `${estimatedCalories.toFixed(0)} Kal`
                )
              }
              index={1}
              icon={Fire03Icon}
            />
            {sportType === "running" ? (
              <StatCard
                bgColor="bg-green-light"
                bgIcon="bg-green-dark"
                title="Steps"
                value={
                  StepCounterDisplay ? (
                    <StepCounterDisplay steps={sportState.steps} />
                  ) : (
                    sportState.steps.toString()
                  )
                }
                index={2}
                icon={RunningShoesIcon}
              />
            ) : (
              <StatCard
                bgColor="bg-green-light"
                bgIcon="bg-green-dark"
                title="Distance"
                value={
                  DistanceDisplay ? (
                    <DistanceDisplay
                      sportType={sportType}
                      steps={sportState.steps}
                      milliseconds={sportState.milliseconds}
                    />
                  ) : (
                    `${sportState.steps} km`
                  )
                }
                index={2}
                icon={Route01Icon}
              />
            )}
            <StatCard
              bgColor="bg-purple-50"
              bgIcon="bg-purple-500"
              title="Avg. Pace"
              value={
                PaceDisplay ? (
                  <PaceDisplay
                    sportType={sportType}
                    steps={sportState.steps}
                    milliseconds={sportState.milliseconds}
                  />
                ) : (
                  "7:25 min/km"
                )
              }
              index={3}
              icon={Time02Icon}
            />
            <StatCard
              bgColor="bg-blue-50"
              bgIcon="bg-blue-500"
              title="Blood Pressure"
              value="118/76 mmHg"
              index={4}
              icon={BloodPressureIcon}
            />
            <StatCard
              bgColor="bg-rose-50"
              bgIcon="bg-rose-500"
              title={"Heart\nRate"}
              value="132 bpm"
              index={5}
              icon={HeartCheckIcon}
            />
            <StatCard
              bgColor="bg-teal-50"
              bgIcon="bg-teal-500"
              title="Blood Oxygen"
              value="98%"
              index={6}
              icon={LungsIcon}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/emergency/waiting")}
          className="bg-red-400 w-full py-5 rounded-xl"
        >
          <Text className="font-latoBold text-center text-base text-white ">
            Emergency
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal confirmation from integrate-ai */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowConfirmModal(false)}>
          <View className="flex-1 justify-center items-center bg-black/40">
            <TouchableWithoutFeedback>
              <View className="bg-white w-10/12 rounded-2xl p-6 shadow-lg">
                <Text className="text-lg font-jakartaBold text-gray-900 mb-2 text-center">
                  Yakin ingin kembali?
                </Text>
                <Text className="text-base font-jakartaMedium text-gray-700 mb-6 text-center">
                  Progres anda akan terhapus
                </Text>
                <View className="flex-row justify-between">
                  <TouchableOpacity
                    onPress={() => setShowConfirmModal(false)}
                    className="flex-1 bg-gray-100 py-3 rounded-xl mr-2"
                  >
                    <Text className="text-gray-700 font-jakartaBold text-center">
                      Batal
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowConfirmModal(false);
                      backToStart();
                    }}
                    className="flex-1 bg-red-400 py-3 rounded-xl ml-2"
                  >
                    <Text className="text-white font-jakartaBold text-center">
                      Ya, Kembali
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default SportTracker;
