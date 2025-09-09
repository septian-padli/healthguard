import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View
      className="flex-1 justify-center items-center"
    >

      <TouchableOpacity onPress={() => router.push("/login")} className="bg-green-normal text-black px-6 py-3 rounded">
        <Text className="font-semibold">Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
