import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "jetbrains": require("../assets/fonts/JetBrainsMono-Regular.ttf"),
    "jetbrains-bold": require("../assets/fonts/JetBrainsMono-Bold.ttf"),
    "jetbrains-medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
