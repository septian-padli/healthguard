import {
  Lato_100Thin, Lato_100Thin_Italic,
  Lato_300Light, Lato_300Light_Italic,
  Lato_400Regular, Lato_400Regular_Italic,
  Lato_700Bold, Lato_700Bold_Italic,
  Lato_900Black, Lato_900Black_Italic
} from "@expo-google-fonts/lato";
import {
  PlusJakartaSans_200ExtraLight, PlusJakartaSans_200ExtraLight_Italic,
  PlusJakartaSans_300Light, PlusJakartaSans_300Light_Italic,
  PlusJakartaSans_400Regular, PlusJakartaSans_400Regular_Italic,
  PlusJakartaSans_500Medium, PlusJakartaSans_500Medium_Italic,
  PlusJakartaSans_600SemiBold, PlusJakartaSans_600SemiBold_Italic,
  PlusJakartaSans_700Bold, PlusJakartaSans_700Bold_Italic,
  PlusJakartaSans_800ExtraBold, PlusJakartaSans_800ExtraBold_Italic
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./global.css";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    jakartaExtraLight: PlusJakartaSans_200ExtraLight,
    jakartaExtraLightItalic: PlusJakartaSans_200ExtraLight_Italic,
    jakartaLight: PlusJakartaSans_300Light,
    jakartaLightItalic: PlusJakartaSans_300Light_Italic,
    jakartaRegular: PlusJakartaSans_400Regular,
    jakartaRegularItalic: PlusJakartaSans_400Regular_Italic,
    jakartaMedium: PlusJakartaSans_500Medium,
    jakartaMediumItalic: PlusJakartaSans_500Medium_Italic,
    jakartaSemiBold: PlusJakartaSans_600SemiBold,
    jakartaSemiBoldItalic: PlusJakartaSans_600SemiBold_Italic,
    jakartaBold: PlusJakartaSans_700Bold,
    jakartaBoldItalic: PlusJakartaSans_700Bold_Italic,
    jakartaExtraBold: PlusJakartaSans_800ExtraBold,
    jakartaExtraBoldItalic: PlusJakartaSans_800ExtraBold_Italic,
    latoThin: Lato_100Thin,
    latoThinItalic: Lato_100Thin_Italic,
    latoLight: Lato_300Light,
    latoLightItalic: Lato_300Light_Italic,
    latoRegular: Lato_400Regular,
    latoRegularItalic: Lato_400Regular_Italic,
    latoBold: Lato_700Bold,
    latoBoldItalic: Lato_700Bold_Italic,
    latoBlack: Lato_900Black,
    latoBlackItalic: Lato_900Black_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(connect-device)/find-device" options={{ headerShown: false }} />
        <Stack.Screen name="(connect-device)/connect-device" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}
