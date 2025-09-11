import ActivityBox from '@/components/ActivityBox';
import { images } from '@/constants/images';
import { ArrowExpandIcon, ArrowRight01Icon, Fire03Icon, SmartWatch03Icon, Timer01Icon, WellnessIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView className="bg-gray-100 min-h-screen" >
        <View className="absolute bg-gray-900 h-96 w-full top-0" />
        <View className='px-4 pt-12 pb-20'>
          <View className="mt-4 mb-10">
            <Image source={images.samsungHealthLogo} className='h-6 w-fit' />
          </View>
          <View className='py-6 mb-4'>
            <Text className="mb-2 font-jakartaMedium leading-tight text-base text-white">Good Work for Today, Harry 🔥</Text>
            <Text className="font-jakartaBold leading-tight text-4xl text-white">Run your way to{'\n'}Better Health</Text>
          </View>
          <View className="flex flex-col gap-2">
            <View className="bg-white rounded-xl p-3">
              <Text className="font-jakartaExtraBold mb-3 text-gray-800">Latest Activities</Text>
              <View className="flex w-full flex-row ">
                <View className='w-1/2 pr-1'>
                  <ActivityBox bg='bg-orange-50' icon={Fire03Icon} style={[styles.orangeBox, styles.roundedBox]} title='Kalori' value='100 / 300 Kal' iconColor='white' iconSize={32} layout='col' />
                </View>
                <View className='pl-1 w-1/2 flex flex-col gap-2'>
                  <ActivityBox bg='bg-green-light'
                    icon={WellnessIcon}
                    style={[styles.greenBox, styles.roundedBox]}
                    title="Wellness"
                    value="80 / 100 Pts"
                    iconColor="white"
                    iconSize={24}
                    layout="row"
                  />
                  <ActivityBox bg='bg-teal-50'
                    icon={Timer01Icon}
                    style={[styles.blueBox, styles.roundedBox]}
                    title="Duration"
                    value="45 / 60 min"
                    iconColor="white"
                    iconSize={24}
                    layout="row"
                  />
                </View>
              </View>
            </View>
            <View className="bg-white rounded-xl p-3 flex flex-col gap-2">
              <View className="flex flex-row items-start justify-between">
                <View className='w-1/6'>
                  <View className="bg-teal-50 rounded-xl flex justify-center items-center aspect-square">
                    <HugeiconsIcon strokeWidth={2} icon={SmartWatch03Icon} className='text-teal-500' size={32} />
                  </View>
                </View>
                <View className='w-4/6 px-2 '>
                  <Text className='text-sm font-jakartaSemiBold text-gray-500'>Wearable Device</Text>
                  <Text className='text-base font-jakartaExtraBold text-gray-800'>Galaxy Watch 7</Text>
                  <Text className='text-sm font-jakartaMedium text-gray-500'>Paired on Sep  5, 12:00  PM</Text>
                </View>
                <View className='w-1/6 p-2'>
                  <TouchableOpacity className='rounded-full bg-gray-900 flex items-center justify-center aspect-square' >
                    <HugeiconsIcon strokeWidth={2} icon={ArrowRight01Icon} className='text-white' size={32} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View className="bg-white rounded-xl p-3">
              <View className="flex flex-row justify-between mb-3">
                <View>
                  <Text className='text-base font-jakartaExtraBold text-gray-800 mb-1'>Safe Tracking</Text>
                  <Text className='text-sm font-jakartaSemiBold text-gray-500'>44 / 500 Kal</Text>
                </View>
                <TouchableOpacity className='flex justify-center items-center'>
                  <HugeiconsIcon strokeWidth={2} icon={ArrowExpandIcon} className='text-gray-300' size={24} />
                </TouchableOpacity>
              </View>
              <View className="w-full aspect-video overflow-hidden">
                <Image source={images.map} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  orangeBox: {
    backgroundColor: '#f97316',
    width: 48,
    height: 48,
  },
  greenBox: {
    backgroundColor: '#8DBF46',
    width: 36,
    height: 36,
  },
  blueBox: {
    backgroundColor: '#14b8a6',
    width: 36,
    height: 36,
  },
  roundedBox: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});