import { images } from '@/constants/images'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const WaitingEmergency = () => {
    const router = useRouter();
    return (
        <>
            <StatusBar style="light" />
            <View className="bg-gray-900 h-full px-4 pt-12 pb-10 flex flex-col justify-between">
                <View>
                    <View className="mt-4 mb-10">
                        <Image source={images.samsungHealthLogo} className='h-6 w-fit' />
                    </View>
                    <View className=''>
                        <Text className='text-white font-jakartaBold text-base mb-2'>SOS</Text>
                        <Text className='text-white font-jakartaBold text-3xl mb-2'>Emergency Calling...</Text>
                        <Text className='font-jakartaMedium text-gray-300 text-sm'>Your contact, app users nearby, and your organization will see your request help</Text>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={() => router.dismiss()} className="bg-green-normal w-full py-5 rounded-xl">
                        <Text className="font-latoBold text-center text-base text-gray-900 ">Saya Aman Sekarang</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default WaitingEmergency

const styles = StyleSheet.create({})