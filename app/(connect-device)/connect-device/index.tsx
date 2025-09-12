import { images } from "@/constants/images";
import { SmartPhone04Icon, SmartWatch04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
export default function ConnectDevice() {
  const router = useRouter();
  const [drawerWaitingVisible, setDrawerWaitingVisible] = useState(false);
  const [drawerSuccessVisible, setDrawerSuccessVisible] = useState(false);
  return (
    <>
      <StatusBar style="light" />
      <View className="flex-1 flex-col justify-end gap-24 items-center py-10 px-4" >
        <View className="gap-12 flex flex-col items-center">
          <Image source={images.galaxyWatch} className="w-fit h-fit mx-auto" />
          <View>
            <Text className="font-jakartaExtraBold text-2xl text-center mb-3">Galaxy Watch 7</Text>
            <Text className="font-jakartaRegular text-lg text-center">Dengan menekan tombol tautkan anda berarti menyetujui seluruh <Link href={"/"} className="text-blue-500 font-jakartaSemiBold">Syarat & Ketentuan</Link> Samsung Health</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setDrawerWaitingVisible(true)} className="bg-green-normal text-black w-full py-5 rounded">
          <Text className="font-latoBold text-center text-lg">Tautkan Perangkat</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={drawerWaitingVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setDrawerWaitingVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1 justify-end items-center bg-black/30"
          onPress={() => {
            setDrawerWaitingVisible(false);
            setDrawerSuccessVisible(true);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            className="w-full"
            onPress={() => { }} // prevent closing when clicking inside drawer
          >
            <View className="bg-white w-full rounded-t-2xl p-6 items-center gap-4 pb-12">
              <View className="flex justify-center gap-4 flex-row">
                <HugeiconsIcon strokeWidth={2} icon={SmartPhone04Icon} className='text-blue-400 mb-6' size={32} />
                <View className="flex flex-row gap-2 items-center justify-center">
                  <View className="w-3 h-3 rounded-full border-2 border-blue-400" />
                  <View className="w-2 h-2 rounded-full bg-gray-200" />
                  <View className="w-2 h-2 rounded-full bg-gray-200" />
                  <View className="w-2 h-2 rounded-full bg-gray-200" />
                </View>
                <HugeiconsIcon strokeWidth={2} icon={SmartWatch04Icon} className='text-blue-400 mb-6' size={32} />

              </View>
              <View className="flex items-center gap-3 mb-4">
                <Text className="font-jakartaExtraBold text-gray-800 text-xl">Tunggu Beberapa Saat...</Text>
                <Text className="font-jakartaSemiBold text-sm text-center text-gray-500">Menghubungkan perangkat mobile dengan wearable watch Anda</Text>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={drawerSuccessVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setDrawerSuccessVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1 justify-end items-center bg-black/30"
          onPress={() => setDrawerSuccessVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            className="w-full"
            onPress={() => { }} // prevent closing when clicking inside drawer
          >
            <View className="bg-white w-full rounded-t-2xl p-6 items-center gap-4 pb-12">
              <HugeiconsIcon strokeWidth={2} icon={SmartWatch04Icon} className='text-blue-400 mb-6' size={48} />
              <View className="flex items-center gap-3 mb-4">
                <Text className="font-jakartaExtraBold text-gray-800 text-xl">Berhasil Terhubung</Text>
                <Text className="font-jakartaSemiBold text-sm text-center text-gray-500">Perangkat wearable anda telah terhubung pada aplikasi samsung health</Text>
              </View>
              <TouchableOpacity onPress={() => {
                setDrawerSuccessVisible(false);
                router.push('/(tabs)/home');
              }}>
                <Text className="font-jakartaBold text-blue-500">Selesai</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
