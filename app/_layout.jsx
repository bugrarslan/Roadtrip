import {Stack, useRouter} from "expo-router";
import {useFonts} from "expo-font";
import {useEffect, useState} from "react";
import {AuthProvider, useAuth} from "../contexts/AuthContext";
import {supabase} from "../lib/supabase";
import {getUserData} from "../services/userService";
import * as SplashScreen from "expo-splash-screen";
import {TripProvider} from "../contexts/TripContext";
import {I18nextProvider} from 'react-i18next';
import i18n from '../services/i18nService';
import 'react-native-get-random-values';

SplashScreen.preventAutoHideAsync()

const _layout = () => {

  const [loaded, error] = useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    SplashScreen.preventAutoHideAsync()
  }

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <TripProvider>
          <MainLayout/>
        </TripProvider>
      </AuthProvider>
    </I18nextProvider>
  );
};

const MainLayout = () => {
  const {setAuth, setUserData,} = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {

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
    if (res?.success) setUserData({...res?.data});
    console.log("user data: ", us);
  };

  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="welcome" options={{headerShown: false}}/>
    </Stack>
  );
};

export default _layout;
