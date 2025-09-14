import { images } from '@/constants/images';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { BackHandler, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WaitingEmergency = () => {
    const router = useRouter();
    // router.push(`/emergency/waiting?duration=${encodeURIComponent(formatDuration(milliseconds))}&steps=${encodeURIComponent(steps)}&condition=${encodeURIComponent(bodyCondition)}`);
    const params = new URLSearchParams(window.location.search);
    const duration = params.get('duration') || 'N/A';
    const steps = params.get('steps') || 'N/A';
    const condition = params.get('condition') || 'N/A';

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => true; // block back button
            const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => sub.remove();
        }, [])
    );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
            <SafeAreaView className="bg-gray-900 h-full px-4 pt-12 pb-10 flex flex-col justify-between">
                <View>
                    <View className="mt-4 mb-10">
                        <Image source={images.samsungHealthLogo} className='h-6 w-fit' />
                    </View>
                    <View className=''>
                        <Text className='text-white font-jakartaBold text-base mb-2'>SOS</Text>
                        <Text className='text-white font-jakartaBold text-3xl mb-2'>Emergency Calling...</Text>
                        {duration !== 'N/A' && steps !== 'N/A' && condition !== 'N/A' && (
                            <Text className='font-jakartaMedium text-gray-300 text-sm'>Saat ini anda sudah berolahraga selama {duration}, dan sejauh {steps} langkah. Kondisi tubuh anda: {condition}</Text>
                        )}
                        <Text className='font-jakartaMedium text-gray-300 text-sm'>Your contact, app users nearby, and your organization will see your request help</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => router.dismiss()} className="bg-green-normal w-full py-5 rounded-xl">
                        <Text className="font-latoBold text-center text-base text-gray-900 ">Saya Aman Sekarang</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}

export default WaitingEmergency

const styles = StyleSheet.create({})