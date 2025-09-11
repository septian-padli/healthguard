import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
export default function Login() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground className=" flex-1 justify-end items-center pb-10" source={images.bgLogin} resizeMode="cover">
        <View className="flex flex-col gap-4 w-full px-4">
          <View className="mb-9">
            <Image className="mb-6" source={images.samsungHealthLogo} />
            <Text className="font-jakartaExtraBold text-4xl text-white mb-3 leading-tight">
              Mulai Perjalanan{'\n'}Hidup Sehatmu
            </Text>
            <Text className="font-jakartaMedium text-lg text-gray-300">Take your first stop toward a healthier. More active lifestyle & help you reach your health goals</Text>
          </View>
          <View className="flex flex-col gap-4 w-full items-center">
            <TouchableOpacity onPress={() => router.push("/find-device")} className="bg-green-normal text-black w-full py-5 rounded">
              <Text className="font-latoBold text-center text-lg">Login with Google</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => router.push("/(tabs)/home")} className="bg-green-normal text-black w-full py-5 rounded">
              <Text className="font-latoBold text-center text-lg">homepage</Text>
            </TouchableOpacity> */}
            <Text className="text-gray-300 font-jakartaMedium">Support by samsung health</Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
