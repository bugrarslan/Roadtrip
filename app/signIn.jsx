import {StyleSheet, Text, View, Pressable, Alert} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {useNavigation, useRouter} from "expo-router";
import {hp, wp} from "@/helpers/common";
import ScreenWrapper from "../components/ScreenWrapper";
import {StatusBar} from "expo-status-bar";
import BackButton from "../components/BackButton";
import {theme} from "../constants/theme";
import Input from "../components/Input";
import Icon from "../assets/icons";
import Button from "../components/Button";
import {supabase} from "../lib/supabase";
import Ionicons from '@expo/vector-icons/Ionicons';

const signIn = () => {
  const navigaiton = useNavigation();
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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

    const {data, error} = await supabase.auth.signInWithPassword({
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenWrapper backgroundColor="white">
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <StatusBar style="dark"/>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <BackButton router={router}/>

            {/* welcome */}
            <View>
              <Text style={styles.welcomeText}>Hey,</Text>
              <Text style={styles.welcomeText}>Welcome Back 👋</Text>
            </View>

            {/* form */}
            <View style={styles.form}>
              <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
                Please login to continue
              </Text>
              <Input
                icon={<Icon name="mail" size={26} strokeWidth={1.6}/>}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(value) => (emailRef.current = value)}
              />
              <Input
                icon={<Icon name="lock" size={26} strokeWidth={1.6}/>}
                showPasswordToggle={<Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}><Ionicons name="eye"
                                                                                                              size={26}
                                                                                                              color="black"/></Pressable>}
                placeholder="Enter your password"
                secureTextEntry={secureTextEntry}
                onChangeText={(value) => (passwordRef.current = value)}
              />
              <Text style={styles.forgotPassword}>forgot password?</Text>

              {/* button */}

              <Button title="Sign In" onPress={onSubmit} loading={loading}/>
            </View>

            {/* footer */}

            {/* footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Pressable onPress={() => router.push("signUp")}>
                <Text
                  style={[
                    styles.footerText,
                    {
                      color: theme.colors.primaryDark,
                      fontWeight: theme.fonts.semibold,
                    },
                  ]}
                >
                  Sign up
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenWrapper>
    </TouchableWithoutFeedback>
  );
};

export default signIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    gap: 45,
    paddingHorizontal: wp(4)
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: "right",
    color: theme.colors.text,
    fontSize: hp(1.6),
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
  },
});
