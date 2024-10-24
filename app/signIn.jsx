import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { hp, wp } from "@/helpers/common";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import { theme } from "../constants/theme";
import Input from "../components/Input";
import Icon from "../assets/icons";
import Button from "../components/Button";

const Page = () => {
  const navigaiton = useNavigation();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigaiton.setOptions({
      headerShown: false,
    });
  }, []);

  const onSubmit = () => {};

  return (
    <ScreenWrapper backgroundColor="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* welcome */}

        <View>
          <Text style={styles.title}>Hadi giriş yapalım</Text>
          <Text style={styles.subTitle}>Tekrar Hoşgeldiniz</Text>
        </View>

        {/* form */}

        <View style={styles.form}>
          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Email adresinizi girin"
            keyboardType="email-address"
            // onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Parolanızı girin"
            secureTextEntry
            // onChangeText={(value) => (passwordRef.current = value)}
          />
          <Text style={styles.forgotPassword}>parolamı unuttum?</Text>

          {/* button */}

          <Button title="Giriş Yap" onPress={onSubmit} loading={loading} />
        </View>

        {/* footer */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Henüz hesabınız yok mu?</Text>
          <Pressable onPress={() => router.push("signUp")}>
            <Text
              style={[
                styles.footerText,
                {
                  color: theme.colors.secondary,
                  fontWeight: theme.fonts.semibold,
                },
              ]}
            >
              Kayıt Ol
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    color: theme.colors.text,
    fontSize: hp(1.6),
    fontFamily: "outfit-medium",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    color: theme.colors.text,
    textAlign: "center",
    fontSize: hp(1.6),
    fontFamily: "outfit-medium",
  },
  title: {
    marginTop: hp(8),
    fontSize: 30,
    fontFamily: "outfit-bold",
  },
  subTitle: {
    fontSize: 30,
    fontFamily: "outfit-medium",
    color: theme.colors.GRAY,
    marginTop: hp(2),
  },
});
