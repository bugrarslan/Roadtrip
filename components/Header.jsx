import {StyleSheet, Text, View} from "react-native";
import React from "react";
import BackButton from "./BackButton";
import {useRouter} from "expo-router";
import {hp} from "../helpers/common";
import {theme} from "../constants/theme";
import CloseButton from "./CloseButton";

const Header = (
  {
    title,
    showBackButton = false,
    mb = 10,
    showCloseButton = false,
    isResetContext = false
  }
) => {
  const router = useRouter();

  return (
    <View style={[styles.container, {marginBottom: mb}]}>
      {showBackButton && (
        <View style={styles.backButton}>
          <BackButton router={router} isResetContext/>
        </View>
      )}
      <Text style={styles.title}>{title || ""}</Text>
      {
        showCloseButton && (
          <View style={styles.closeButton}>
            <CloseButton router={router}/>
          </View>
        )
      }
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    gap: 10,
  },
  title: {
    fontSize: hp(2.5),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.bold,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  closeButton: {
    position: "absolute",
    right: 0,
  },
});
