import { StyleSheet } from "react-native";
import React from "react";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { Image } from "expo-image";
import { getUserImageSrc } from "../services/imageService";

const Avatar = ({
                  size = hp(4.5),
                  uri,
                  rounded = theme.radius.md,
                  style = {},
                }) => {
  return (
    <Image
      source={getUserImageSrc(uri)}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: rounded,
        },
        style,
      ]}
      transition={100}
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: theme.colors.darkLight,
    borderWidth: 1,

  },
});
