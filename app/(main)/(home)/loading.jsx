import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { wp, hp } from "../../../helpers/common";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { theme } from "../../../constants/theme";

const loading = () => {
  return (
    <ScreenWrapper backgroundColor={theme.colors.WHITE}>
      <View style={styles.container}>
        <View style={styles.loading}>
          <LottieView
            source={require("../../../assets/animations/plane-animation.json")}
            style={{
              width: wp(100),
              aspectRatio: 1,
              padding: wp(4)
            }}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.text}>
          Kemerlerinizi bağlayın!
        </Text>
        <Text style={[styles.text, {fontFamily: "outfit-bold"}]}>
          Seyahatiniz hazırlanıyor...
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: hp(4),
    color: "#000",
    textAlign: "center",
    overflow: "hidden",
    fontFamily: "outfit",
  },
});
