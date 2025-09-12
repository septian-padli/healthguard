import StatCard from '@/components/StatCard';
import { images } from '@/constants/images';
import { BodyPartSixPackIcon, Fire03Icon, HeartAddIcon, HeartCheckIcon, PauseIcon, PlayIcon, RunningShoesIcon, Time03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const SportTracker: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [milliseconds, setMilliseconds] = useState(0);
    const router = useRouter();
    const sportType = useLocalSearchParams().sport as string;
    const imageSport = sportType === 'running' ? images.runScreen : sportType === 'bicycle' ? images.bicycleScreen : images.runScreen;

    // Stopwatch effect (10ms interval)
    React.useEffect(() => {
        let timer: number | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setMilliseconds(prev => prev + 10);
            }, 10);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [isRunning]);

    // Format milliseconds to MM:SS:MS (langsung di render)
    const formatDuration = (ms: number) => {
        const mins = Math.floor(ms / 60000);
        const secs = Math.floor((ms % 60000) / 1000);
        const centis = Math.floor((ms % 1000) / 10);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${centis.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    return (
        <SafeAreaView className="flex-1 justify-end items-center bg-gray-50">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <Image source={imageSport} className="w-full aspect-video object-cover absolute -top-20 left-0" />

            <View className='flex justify-end items-center pb-10 pt-12 px-4 bg-white rounded-t-3xl relative z-10 w-full'>
                <TouchableOpacity onPress={toggleTimer} className="bg-green-normal text-gray-800 aspect-square flex justify-center items-center py-4 mb-6 rounded-xl">
                    <HugeiconsIcon strokeWidth={3} icon={isRunning ? PauseIcon : PlayIcon} className='text-gray-800 mb-1' size={32} />
                </TouchableOpacity>
                <View className=" w-full mb-8 ">
                    <View className="w-48 mx-auto flex flex-row justify-start pl-2">
                        <Text className="text-4xl font-jakartaExtraBold text-gray-900">
                            {formatDuration(milliseconds)}
                        </Text>
                    </View>
                    <Text className="text-base font-jakartaMedium text-gray-700 text-center">Total Duration</Text>
                </View>
                <View className=" w-full h-fit mb-8">
                    <View className='flex flex-row flex-wrap'>
                        <StatCard
                            bgColor='bg-orange-50'
                            bgIcon='bg-orange-500'
                            title='Kalori'
                            value='44 / 500 Kal'
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
                            value='5:25/km'
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
                            title='Langkah'
                            value='2,500'
                            index={6}
                            icon={RunningShoesIcon}
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