import { images } from "@/constants/images";
import { Loading02FreeIcons, SearchVisualIcon, SmartWatch03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

export default function FindDevice() {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <>
      <StatusBar style="dark" />
      <View className="flex-1 flex-col justify-end gap-24 items-center py-10 px-4" >
        <View className="gap-12 flex flex-col items-center">
          <Text className="font-jakartaExtraBold text-2xl text-gray-800">Menyiapkan Aplikasi...</Text>
          <Image source={images.watch} className="w-fit h-fit mx-auto" />
          <View>
            <Text className="font-jakartaExtraBold text-2xl text-center mb-3">Temukan &{'\n'}Hubungkan Perangkat</Text>
            <Text className="font-jakartaRegular text-lg text-center">Smart watch akan membantu anda untuk mengetahui kesehatan anda lebih detail</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setDrawerVisible(true)} className="bg-green-normal text-black w-full py-5 rounded">
          <Text className="font-latoBold text-center text-lg">Temukan Perangkat</Text>
        </TouchableOpacity>
      </View>
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
            onPress={() => { }} // prevent closing when clicking inside drawer
          >
            <View className="bg-white w-full rounded-t-2xl p-6 items-center gap-4">
              <HugeiconsIcon strokeWidth={2} icon={SearchVisualIcon} className='text-blue-400 mb-6' size={48} />
              <View className="flex items-center gap-3 mb-4">
                <Text className="font-jakartaExtraBold text-gray-800 text-xl">Mencari Perangkat</Text>
                <Text className="font-jakartaSemiBold text-sm text-center text-gray-500">Make sure the device you want to add is turned on. Your device might not appear if it’s connected to a different phone. <Link className="text-blue-500 underline" href="/">Get Help.</Link></Text>
              </View>
              <View className="flex flex-col gap-2">
                <View className="flex flex-row justify-between w-full gap-3">
                  <Text className="font-jakartaExtraBold text-gray-800 text-xl">Available Device</Text>
                  <HugeiconsIcon strokeWidth={1} icon={Loading02FreeIcons} className='text-gray-400' size={24} />
                </View>
                <View className="flex flex-col">
                  <TouchableOpacity
                    onPress={() => {
                      setDrawerVisible(false);
                      router.push('/(connect-device)/connect-device');
                    }}
                    className="flex flex-row items-center gap-3 px-3 py-4 border-b border-gray-200"
                  >
                    <HugeiconsIcon strokeWidth={2} icon={SmartWatch03Icon} className='text-gray-400' size={32} />
                    <Text className="text-gray-800 font-jakartaSemiBold">KC GW Ultra Gray</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => {
                setDrawerVisible(false);
                router.push('/(tabs)/home');
              }}
                className="bg-gray-200 w-full p-4 items-center rounded-xl mt-8">
                <Text className="font-jakartaBold  text-gray-800">Skip</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
