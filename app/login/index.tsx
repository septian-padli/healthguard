import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
export default function Login() {
  const router = useRouter();

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground className="flex-1 justify-end items-center pb-10" source={images.bgLogin} resizeMode="cover">
        <View className="flex flex-col gap-4 w-full px-4">
          <View className="mb-9">
            <Image className="mb-6" source={images.samsungHealthLogo} />
            <Text className="font-extrabold text-4xl text-white mb-3">Mulai perjalanan hidup sehatmu</Text>
            <Text className="font-medium text-lg text-white">Take your first stop toward a healthier. More active lifestyle & help you reach your health goals</Text>
          </View>
          <View className="flex flex-col gap-4 w-full items-center">
            <TouchableOpacity onPress={() => router.push("/")} className="bg-green-normal text-black w-full py-5 rounded">
              <Text className="font-semibold text-center text-lg">Login with Google</Text>
            </TouchableOpacity>
            <Text className="text-white">Support by samsung health</Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
