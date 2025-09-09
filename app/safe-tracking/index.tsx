import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
export default function Login() {
  const router = useRouter();
  return (
    <>
      <StatusBar style="light" />
      <View className="flex-1 flex-col justify-end gap-24 items-center py-10 px-4" >
        <View className="gap-12 flex flex-col items-center">
          <Text className="font-jakartaExtraBold text-2xl text-gray-800">Menyiapkan Aplikasi...</Text>
          <Image source={images.watch} className="w-52 h-fit mx-auto" />
          <View>
            <Text className="font-jakartaExtraBold text-2xl text-center mb-3">Temukan &{'\n'}Hubungkan Perangkat</Text>
            <Text className="font-jakartaSemiBold text-lg text-center">Smart watch akan membantu anda untuk mengetahui kesehatan anda lebih detail</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push("/safe-tracking")} className="bg-green-normal text-black w-full py-5 rounded">
          <Text className="font-latoBold text-center text-lg">Temukan Perangkat</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
