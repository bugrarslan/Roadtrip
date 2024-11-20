import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import React, { useEffect, useRef, useState } from "react";
  import { useNavigation, useRouter } from "expo-router";
  import { hp, wp } from "@/helpers/common";
  import ScreenWrapper from "@/components/ScreenWrapper";
  import { StatusBar } from "expo-status-bar";
  import { theme } from "../constants/theme";
  import BackButton from "@/components/BackButton";
  import Input from "../components/Input";
  import Icon from "../assets/icons";
  import Button from "../components/Button";
  import { supabase } from "../lib/supabase";
  
  
  const signUp = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const emailRef = useRef("");
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmRef = useRef("");
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);
  
    const onSubmit = async () => {
      if (!emailRef.current || !passwordRef.current || !nameRef.current) {
        return Alert.alert("Sign Up", "Lütfen tüm boşlukları doldurun!");
        return;
      }
  
      if (passwordRef.current !== passwordConfirmRef.current) {
        return Alert.alert("Sign Up", "Parolalar eşleşmiyor, tekrar deneyin.");
        return;
      }
  
      let name = nameRef.current.trim();
      let email = emailRef.current.trim();
      let password = passwordRef.current.trim();
  
      setLoading(true);
  
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            email,
          },
        },
      });
  
      setLoading(false);
  
      console.log("session", session);
      console.log("error", error);
  
      if (error) {
        Alert.alert("Kayıt Ol", "Bir hata oluştu, lütfen tekrar deneyin.");
      }
    };
  
    return (
      <ScreenWrapper backgroundColor={"white"}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <BackButton router={router} />
  
          {/* welcome */}
  
          <View>
            <Text style={styles.title}>Hadi kayıt olalım</Text>
            <Text style={styles.subTitle}>Sizi aramızda görmek güzel!</Text>
          </View>
  
          {/* form */}
  
          <View style={styles.form}>
            <Input
              icon={<Icon name="user" size={26} strokeWidth={1.6} />}
              placeholder="Kullanıcı adınızı girin"
              autoCapitalize="none"
              onChangeText={(value) => (nameRef.current = value)}
            />
            <Input
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Email adresinizi girin"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) => (emailRef.current = value)}
            />
            <Input
              icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
              placeholder="Parolanızı girin"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
            />
            <Input
              icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
              placeholder="Parolanızı tekrar girin"
              secureTextEntry
              onChangeText={(value) => (passwordConfirmRef.current = value)}
            />
  
            {/* button */}
  
            <Button 
              title="Kayıt Ol" 
              onPress={onSubmit} 
              loading={loading} 
            />
          </View>
  
          {/* footer */}
  
          <View style={styles.footer}>
            <Text style={styles.footerText}>Zaten bir hesabın var mı?</Text>
            <Pressable onPress={() => router.push("/signIn")}>
              <Text
                style={[
                  styles.footerText,
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
      </ScreenWrapper>
    );
  };
  
  export default signUp;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 45,
      paddingHorizontal: wp(5),
    },
    form: {
      gap: 25,
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
  