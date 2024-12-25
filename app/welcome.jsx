import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";
import ScreenWrapper from "../components/ScreenWrapper";
import LottieView from "lottie-react-native";
import { useTranslation } from 'react-i18next';

const Page = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScreenWrapper backgroundColor="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <LottieView
          source={require("../assets/animations/welcome.json")}
          style={styles.welcomeImage}
          autoPlay
          loop
        />
        <View style={{ gap: 20 }}>
          <Text style={styles.title}>RoadTrip</Text>
          <Text style={styles.punchline}>
            {t("welcome.welcomeText")}
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            title={t("welcome.welcomeButtonText")}
            buttonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push("/signUp")}
          />

          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>{t("welcome.welcomeFooterText")}</Text>
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
                {t("welcome.welcomeFooterButtonText")}
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
    fontWeight: theme.fonts.extraBold,
  },
  punchline: {
    textAlign: "center",
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text,
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
  },
});
