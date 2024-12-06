import { Stack, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { getUserData } from "../services/userService";
import * as SplashScreen from "expo-splash-screen";
import 'react-native-get-random-values';

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded] = useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (loaded) {
        await SplashScreen.hideAsync(); // Splash ekranı gizlenir.
      }
    };

    hideSplashScreen();
  }, [loaded]);

  if (!loaded) {
    return null; // Fontlar yüklenene kadar ekran boş bırakılır.
  }
  // const [loaded, error] = useFonts({
  //   "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
  //   "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  //   "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }

  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData,  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("session: ", session?.user);

      if (session) {
        // move to ho me screen
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace("/(main)/(home)");
      } else {
        // move to welcome screen
        // set context null
        setAuth(null);
        router.replace("/welcome");
      }
    });
  }, []);

  const updateUserData = async (user) => {
    let res = await getUserData(user?.id);
    if (res?.success) setUserData({ ...res?.data });
    console.log("user data: ", us);
  };

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
