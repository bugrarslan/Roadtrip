import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { hp, wp } from "@/helpers/common";
import ScreenWrapper from "../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import BackButton from "../components/BackButton";
import { theme } from "../constants/theme";
import Input from "../components/Input";
import Icon from "../assets/icons";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";

const signIn = () => {
  const navigaiton = useNavigation();
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigaiton.setOptions({
      headerShown: false,
    });
  }, []);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      return Alert.alert("Sign In", "Please fill all tht blanks!");
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current,
      password: passwordRef.current,
    });

    setLoading(false);

    if (error) {
      console.log("error", error);
    }

    if (error) {
      Alert.alert("Sign In", error.message);
    }
  };

  return (
    <ScreenWrapper backgroundColor="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* welcome */}

        <View>
          <Text style={styles.title}>Let's sign in</Text>
          <Text style={styles.subTitle}>Welcome back 👋</Text>
        </View>

        {/* form */}

        <View style={styles.form}>
          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => (emailRef.current = value)}
          />
          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
          />
          <Text style={styles.forgotPassword}>forgot password?</Text>

          {/* button */}

          <Button title="Sign In" onPress={onSubmit} loading={loading} />
        </View>

        {/* footer */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
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
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default signIn;

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
