import { StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import LottieView from "lottie-react-native";

const Loading = ({ color = theme.colors.primary, size }) => {
  return (
    <LottieView
      source={require("../assets/animations/loading.json")}
      style={[
        size === "large" ? { width: hp(20) } : { width: hp(8) },
        {
          aspectRatio: 1,
          padding: wp(4),
        },
      ]}
      autoPlay
      loop
    />
  );
};

export default Loading;

const styles = StyleSheet.create({});
