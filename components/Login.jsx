import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { hp, wp } from "@/helpers/common";
import { Colors } from "@/constants/Colors";

const Login = () => {
  return (
    <View>
      <Image
        source={require("../assets/images/login.png")}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          RoadTrip
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-medium",
            textAlign: "center",
          }}
        >
          Seyahat yardımcınız
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            textAlign: "center",
            fontSize: 17,
            color: Colors.GRAY,
            marginTop: 20,
          }}
        >
          Bir sonraki maceranı zahmetsizce keşfet. Kişiselleştirilmiş seyahat
          planları parmaklarının ucunda. Yapay zeka destekli içgörülerle daha
          akıllı seyahat et.
        </Text>
        <View style={styles.button}>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Google ile giriş yapın
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: hp(64),
  },
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -20,
    height: hp(100),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 30,
    marginTop: "20%",
  },
});
