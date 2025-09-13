import { images } from '@/constants/images'
import { BicycleIcon, WorkoutRunIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Dimensions, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Start = () => {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screenHeight = Dimensions.get('window').height;
  const inch = screenHeight / 160;

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground imageStyle={{ borderRadius: 12 }} resizeMode='cover' source={images.map} className="px-4 h-screen relative flex justify-end pb-40 " >
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => { setDrawerVisible(true) }}
          className="bg-green-normal text-gray-800 w-full py-5 rounded"
          style={{ marginBottom: inch * 5 }}
        >
          <Text className="font-latoBold text-center text-lg">Mulai Olahraga</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Modal
        visible={drawerVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setDrawerVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1 justify-end items-center bg-black/30"
          onPress={() => setDrawerVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            className="w-full"
            onPress={() => { }}
          >
            <View className="bg-white w-full rounded-t-2xl p-6 items-center gap-2 flex flex-row">
              <TouchableOpacity activeOpacity={0.5} onPress={() => {
                setDrawerVisible(false);
                router.push('/sport/running');
              }}
                className="bg-gray-200 w-1/2 p-4 items-center flex flex-row justify-center rounded-xl mb-8 gap-2">
                <HugeiconsIcon strokeWidth={2} icon={WorkoutRunIcon} className='text-blue-400 mb-1' size={32} />
                <Text className="font-jakartaBold  text-gray-800">Jogging</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={() => {
                setDrawerVisible(false);
                router.push('/sport/bicycle');
              }}
                className="bg-gray-200 w-1/2 p-4 items-center flex flex-row justify-center rounded-xl mb-8 gap-2">
                <HugeiconsIcon strokeWidth={2} icon={BicycleIcon} className='text-blue-400 mb-1' size={32} />
                <Text className="font-jakartaBold  text-gray-800">Bersepeda</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

export default Start

const styles = StyleSheet.create({})