import StatCard from '@/components/StatCard';
import { images } from '@/constants/images';
import { callDeepSeekAPI } from '@/utils/api-call-deepseek';
import { ArrowLeft01Icon, BloodPressureIcon, Fire03Icon, HeartCheckIcon, LungsIcon, PauseIcon, PlayIcon, Route01Icon, RunningShoesIcon, Time02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useFocusEffect, useLocalSearchParams, usePathname, useRouter } from 'expo-router';
import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    Image,
    Modal,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const SportTracker: React.FC = () => {
    const [steps, setSteps] = useState<number>(0);
    const [isCounting, setIsCounting] = useState(false);
    const [lastY, setLastY] = useState<number | null>(0);
    const [lastTimestamp, setLastTimestamp] = useState<number | null>(0);
    const [isRunning, setIsRunning] = useState(false);
    const [milliseconds, setMilliseconds] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const router = useRouter();
    const sportType = useLocalSearchParams().sport as string;
    const imageSport = sportType === 'running' ? images.runScreen : sportType === 'bicycle' ? images.bicycleScreen : images.runScreen;
    const CALORIES_PER_STEP = 0.04;
    let pathname = usePathname();
    const [bodyCondition, setBodyCondition] = useState('Semangat Olahraga');
    const [bodyConditionTrigger, setBodyConditionTrigger] = useState(0);

    useEffect(() => {
        let subscription: { remove: () => void } | null = null;
        if (isRunning) {
            Accelerometer.isAvailableAsync().then((result) => {
                if (result) {
                    subscription = Accelerometer.addListener((accelerometerData) => {
                        const { y } = accelerometerData;
                        const thereshold = 0.1;
                        const timestamp = new Date().getTime();

                        if (Math.abs(y - (lastY ?? 0)) > thereshold && !isCounting && (lastTimestamp === null || (timestamp - lastTimestamp) > 800)) {
                            setIsCounting(true);
                            setLastY(y);
                            setLastTimestamp(timestamp);
                            setSteps(prev => prev + 1);
                            setTimeout(() => {
                                setIsCounting(false);
                            }, 1200);
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
    }, [isRunning, isCounting, lastY, lastTimestamp]);

    // back to start function
    function backToStart() {
        setIsRunning(false);
        setMilliseconds(0);
        router.push('/(tabs)/start');
    }

    // Stopwatch effect (10ms interval)
    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | null = null;
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

    // Handle hardware back button hanya saat halaman ini fokus
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (!showConfirmModal) {
                    setShowConfirmModal(true);
                }
                return true;
            };
            const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => sub.remove();
        }, [showConfirmModal])
    );

    const statusConditionBody = async () => {
        const queryAi = sportType === 'running' ? `Saya laki-laki berumur 20 tahun dengan berat badan 70 kg dan tinggi badan 173 cm dan tidak pernah berolahraga. Saya sedang berolahraga running. Saya sudah berjalan sebanyak ${steps * 100000} steps dengan durasi ${formatDuration(milliseconds * 60)} jam. Bagaimana kondisi tubuh saya sekarang? Apakah normal, lelah, atau berbahaya? Berikan jawaban singkat hanya satu kata: normal, lelah, atau bahaya.`
            : `Saya laki-laki berumur 20 tahun dengan berat badan 70 kg dan tinggi badan 173 cm dan tidak pernah berolahraga. Saya sedang berolahraga bersepeda. Saya sudah bersepeda sebanyak ${steps} km dengan durasi ${formatDuration(milliseconds)}. Bagaimana kondisi tubuh saya sekarang? Apakah normal, lelah, atau berbahaya? Berikan jawaban singkat hanya satu kata: normal, lelah, atau bahaya.`
        try {
            const result = await callDeepSeekAPI(queryAi);
            setBodyCondition(result?.trim() ?? 'error');
            setBodyConditionTrigger(prev => prev + 1);
        } catch (err) {
            console.error("API error:", err);
            setBodyCondition('error');
        }
    }

    useEffect(() => {
        if (
            steps > 0 &&
            steps % 5 === 0 &&
            pathname.includes('sport')
        ) {
            statusConditionBody();
        }
    }, [steps]);

    useEffect(() => {
        if (bodyCondition.includes('Bahaya') || bodyCondition.includes('Lelah')) {
            setIsRunning(false);
            router.push('/emergency/waiting');
        }
    }, [bodyConditionTrigger]);

    const estimatedCalories = steps * CALORIES_PER_STEP;
    // Hitung kategori lainnya di sini jika diperlukan

    return (
        <SafeAreaView className="flex-1 justify-end items-center bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

            <Image source={imageSport} className="w-full aspect-video object-cover absolute -top-20 left-0" />
            <TouchableOpacity
                onPress={() => setShowConfirmModal(true)}
                className="absolute top-12 left-4 bg-white rounded-full p-2"
            >
                <HugeiconsIcon strokeWidth={1.5} icon={ArrowLeft01Icon} className='text-gray-800' size={24} />
            </TouchableOpacity>

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
                    <Text className="text-base font-jakartaMedium text-gray-700 text-center mb-1">Total Duration</Text>
                    {
                        bodyCondition.includes('Normal') ? (
                            <Text className="text-base font-jakartaMedium text-gray-500 text-center">
                                Ayo! Kamu pasti bisa!
                            </Text>
                        ) : bodyCondition.includes('Lelah') ? (
                            <Text className="text-base font-jakartaMedium text-amber-600 text-center">
                                Anda lelah, mari beristirahat sejenak
                            </Text>
                        ) : bodyCondition.includes('Bahaya') ? (
                            <Text className="text-base font-jakartaMedium text-red-600 text-center">
                                Dalam Bahaya! Segera cari bantuan.
                            </Text>
                        ) : <Text className="text-base font-jakartaMedium text-rgray-500 text-center">
                            Semangat Olahraga!
                        </Text>
                    }
                </View>
                <View className=" w-full h-fit mb-8">
                    <View className='flex flex-row flex-wrap'>
                        <StatCard
                            bgColor='bg-orange-50'
                            bgIcon='bg-orange-500'
                            title='Kalori'
                            value={`${estimatedCalories.toFixed(0)} Kal`}
                            index={1}
                            icon={Fire03Icon}
                        />
                        {sportType === 'running' ? (
                            <StatCard
                                bgColor='bg-green-light'
                                bgIcon='bg-green-dark'
                                title='Steps'
                                value={steps.toString()}
                                index={2}
                                icon={RunningShoesIcon}
                            />
                        ) : (
                            <StatCard
                                bgColor='bg-green-light'
                                bgIcon='bg-green-dark'
                                title='Distance'
                                value={steps.toString() + ' km'}
                                index={2}
                                icon={Route01Icon}
                            />
                        )}
                        <StatCard
                            bgColor='bg-purple-50'
                            bgIcon='bg-purple-500'
                            title='Avg. Pace'
                            value="7:25 min/km"
                            index={3}
                            icon={Time02Icon}
                        />
                        <StatCard
                            bgColor='bg-blue-50'
                            bgIcon='bg-blue-500'
                            title='Blood Pressure'
                            value='118/76 mmHg'
                            index={4}
                            icon={BloodPressureIcon}
                        />
                        <StatCard
                            bgColor='bg-rose-50'
                            bgIcon='bg-rose-500'
                            title={'Heart\nRate'}
                            value='132 bpm'
                            index={5}
                            icon={HeartCheckIcon}
                        />
                        <StatCard
                            bgColor='bg-teal-50'
                            bgIcon='bg-teal-500'
                            title='Blood Oxygen'
                            value='98%'
                            index={6}
                            icon={LungsIcon}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => router.push("/emergency/waiting")} className="bg-red-400 w-full py-5 rounded-xl">
                    <Text className="font-latoBold text-center text-base text-white ">Emergency</Text>
                </TouchableOpacity>
            </View>

            {/* Modal konfirmasi untuk kembali ke start */}
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
                                        <Text className="text-gray-700 font-jakartaBold text-center">Batal</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowConfirmModal(false);
                                            backToStart();
                                        }}
                                        className="flex-1 bg-red-400 py-3 rounded-xl ml-2"
                                    >
                                        <Text className="text-white font-jakartaBold text-center">Ya, Kembali</Text>
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