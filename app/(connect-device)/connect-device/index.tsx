import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
export default function ConnectDevice() {
  const router = useRouter();
  return (
    <>
      <StatusBar style="dark" />
      <View className="flex-1 flex-col justify-end gap-24 items-center py-10 px-4" >
        <View className="gap-12 flex flex-col items-center">
          <Image source={images.galaxyWatch} className="w-fit h-fit mx-auto" />
          <View>
            <Text className="font-jakartaExtraBold text-2xl text-center mb-3">Galaxy Watch 7</Text>
            <Text className="font-jakartaRegular text-lg text-center">Dengan menekan tombol tautkan anda berarti menyetujui seluruh <Link href={"/"} className="text-blue-500 font-jakartaSemiBold">Syarat & Ketentuan</Link> Samsung Health</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push("/")} className="bg-green-normal text-black w-full py-5 rounded">
          <Text className="font-latoBold text-center text-lg">Tautkan Perangkat</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
