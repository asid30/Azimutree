import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        statusBarBackgroundColor: "black",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="camera"
        options={{ headerShown: false, title: "Kamera" }}
      />
      <Stack.Screen
        name="camera-example"
        options={{ headerShown: false, title: "Kamera" }}
      />
    </Stack>
  );
}
