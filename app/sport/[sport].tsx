import StatCard from '@/components/StatCard';
import { images } from '@/constants/images';
import { BodyPartSixPackIcon, Fire03Icon, HeartAddIcon, HeartCheckIcon, PauseIcon, PlayIcon, RunningShoesIcon, Time03Icon, Route01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// @message: Beberapa file ini diimpor buat modularisasi kode dan memisahkan logika perhitungan dari komponen UI utama.
// Untuk memudahkan pembacaan dan perubahan, dapat dicek melalui path berikut:
import { SPORT_CONSTANTS } from '@/app-example/constants/Sports';
import { SportType, SportState } from '@/app-example/types/sport-types';

// Import Utilitas
import { DurationDisplay } from '@/app-example/utils/DurationUtils';

// Import Komponen
import { DistanceDisplay } from '@/components/DistanceCalculations';
import { PaceDisplay } from '@/components/PaceCalculations';
import { CaloriesDisplay } from '@/components/CaloriesCalculations';
import { isStepDetected, StepCounterDisplay } from '@/app-example/utils/StepDetectionUtils';

const SportTracker: React.FC = () => {
    const [sportState, setSportState] = useState<SportState>({
        steps: 0,
        isCounting: false,
        lastY: 0,
        lastTimestamp: 0,
        isRunning: false,
        milliseconds: 0
    });

    const router = useRouter();
    const sportType = useLocalSearchParams().sport as SportType;
    const imageSport = sportType === 'running' ? images.runScreen : 
                      sportType === 'bicycle' ? images.bicycleScreen : 
                      images.runScreen;

    // Accelerometer effect
    useEffect(() => {
        let subscription: { remove: () => void } | null = null;
        if (sportState.isRunning) {
            Accelerometer.isAvailableAsync().then((result) => {
                if (result) {
                    subscription = Accelerometer.addListener((accelerometerData) => {
                        const { y } = accelerometerData;
                        const timestamp = new Date().getTime();

                        if (isStepDetected(y, sportState.lastY, sportState.isCounting, sportState.lastTimestamp)) {
                            setSportState(prev => ({
                                ...prev,
                                isCounting: true,
                                lastY: y,
                                lastTimestamp: timestamp,
                                steps: prev.steps + 1
                            }));
                            
                            setTimeout(() => {
                                setSportState(prev => ({
                                    ...prev,
                                    isCounting: false
                                }));
                            }, SPORT_CONSTANTS.COUNTING_TIMEOUT);
                        }
                    });
                } else {
                    console.log('Accelerometer not available on this device.');
                }
            });
        }
        return () => {
            if (subscription) {
                subscription.remove();
                subscription = null;
            }
        }
    }, [sportState.isRunning, sportState.isCounting, sportState.lastY, sportState.lastTimestamp]);

    // Stopwatch effect
    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null;
        if (sportState.isRunning) {
            timer = setInterval(() => {
                setSportState(prev => ({
                    ...prev,
                    milliseconds: prev.milliseconds + 10
                }));
            }, 10);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [sportState.isRunning]);

    // Emergency detection effect
    useEffect(() => {
        if (sportState.steps >= SPORT_CONSTANTS.EMERGENCY_STEP_LIMIT) {
            router.replace("/emergency/waiting");
        }
    }, [sportState.steps]);

    const toggleTimer = () => {
        if (!sportState.isRunning) {
            // Reset when starting
            setSportState(prev => ({
                ...prev,
                steps: 0,
                lastY: 0,
                lastTimestamp: 0,
                milliseconds: 0
            }));
        }
        setSportState(prev => ({
            ...prev,
            isRunning: !prev.isRunning
        }));
    };

    return (
        <SafeAreaView className="flex-1 justify-end items-center bg-gray-50">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <Image source={imageSport} className="w-full aspect-video object-cover absolute -top-20 left-0" />

            <View className='flex justify-end items-center pb-10 pt-12 px-4 bg-white rounded-t-3xl relative z-10 w-full'>
                <TouchableOpacity onPress={toggleTimer} className="bg-green-normal text-gray-800 aspect-square flex justify-center items-center py-4 mb-6 rounded-xl">
                    <HugeiconsIcon strokeWidth={3} icon={sportState.isRunning ? PauseIcon : PlayIcon} className='text-gray-800 mb-1' size={32} />
                </TouchableOpacity>
                
                <View className=" w-full mb-8 ">
                    <View className="w-48 mx-auto flex flex-row justify-start pl-2">
                        <DurationDisplay 
                            milliseconds={sportState.milliseconds}
                            className="text-4xl font-jakartaExtraBold text-gray-900"
                        />
                    </View>
                    <Text className="text-base font-jakartaMedium text-gray-700 text-center">Total Duration</Text>
                </View>
                
                <View className=" w-full h-fit mb-8">
                    <View className='flex flex-row flex-wrap'>
                        <StatCard
                            bgColor='bg-orange-50'
                            bgIcon='bg-orange-500'
                            title='Kalori'
                            value={
                                <CaloriesDisplay 
                                    sportType={sportType}
                                    steps={sportState.steps}
                                    milliseconds={sportState.milliseconds}
                                />
                            }
                            index={1}
                            icon={Fire03Icon}
                        />
                        <StatCard
                            bgColor='bg-blue-50'
                            bgIcon='bg-blue-500'
                            title='Avg Darah'
                            value='800 m/jam'
                            index={2}
                            icon={HeartAddIcon}
                        />
                        <StatCard
                            bgColor='bg-purple-50'
                            bgIcon='bg-purple-500'
                            title='Avg Pace'
                            value={
                                <PaceDisplay 
                                    sportType={sportType}
                                    steps={sportState.steps}
                                    milliseconds={sportState.milliseconds}
                                />
                            }
                            index={3}
                            icon={Time03Icon}
                        />
                        <StatCard
                            bgColor='bg-rose-50'
                            bgIcon='bg-rose-500'
                            title='Heart Rate'
                            value='120 bpm'
                            index={4}
                            icon={HeartCheckIcon}
                        />
                        <StatCard
                            bgColor='bg-teal-50'
                            bgIcon='bg-teal-500'
                            title='SpO2'
                            value='98%'
                            index={5}
                            icon={BodyPartSixPackIcon}
                        />
                        <StatCard
                            bgColor='bg-green-light'
                            bgIcon='bg-green-dark'
                            title={sportType === 'bicycle' ? 'Jarak' : 'Langkah'}
                            value={sportType === 'bicycle' ? 
                                <DistanceDisplay 
                                    sportType={sportType}
                                    steps={sportState.steps}
                                    milliseconds={sportState.milliseconds}
                                /> : 
                                <StepCounterDisplay steps={sportState.steps} />
                            }
                            index={6}
                            icon={sportType === 'bicycle' ? Route01Icon : RunningShoesIcon}
                        />
                    </View>
                </View>
                
                <TouchableOpacity onPress={() => router.push("/emergency/waiting")} className="bg-red-400 w-full py-5 rounded-xl">
                    <Text className="font-latoBold text-center text-base text-white ">Emergency</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SportTracker;