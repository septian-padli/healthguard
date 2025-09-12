import { Stack } from "expo-router";

export default function FindDeviceLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, statusBarHidden: false }} />
  );
}
