import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";
import ScreenWrapper from "../components/ScreenWrapper";
import LottieView from "lottie-react-native";

const Page = () => {
  const router = useRouter();

  return (
    <ScreenWrapper backgroundColor="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <LottieView
          source={require("../assets/animations/welcome.json")}
          style={{
            width: wp(100),
            aspectRatio: 1,
            padding: wp(4)
          }}
          autoPlay
          loop
        />
        {/* <Image
          source={require("../assets/images/welcome1.png")}
          style={styles.welcomeImage}
          resizeMode="cover"
        /> */}
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>RoadTrip</Text>
          <Text style={styles.punchline}>
            Bir sonraki maceranı zahmetsizce keşfet. Kişiselleştirilmiş seyahat
            planları parmaklarının ucunda. Yapay zekâ destekli içgörülerle daha
            akıllı seyahat et.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title="Başlayalım!"
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push("signUp")}
          />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Zaten bir hesabın var mı?</Text>
            <Pressable onPress={() => router.push("/signIn")}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.secondary,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Giriş Yap
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    width: wp(100),
    height: hp(30),
    alignSelf: "center",
  },
  title: {
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
    fontFamily: "outfit",
  },
  footer: {
    width: "100%",
    gap: 30,
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
    fontFamily: "outfit-medium",
  },
});
