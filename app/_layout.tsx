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
        options={{ headerShown: false, title: "camera-example" }}
      />
      <Stack.Screen
        name="camera-example-v2"
        options={{ headerShown: false, title: "camera-example-v2" }}
      />
      <Stack.Screen
        name="scanner-example"
        options={{ headerShown: false, title: "scanner-example" }}
      />
    </Stack>
  );
}
