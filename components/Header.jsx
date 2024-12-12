import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "./BackButton";
import { useRouter } from "expo-router";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";

const Header = ({ title, showBackButton = true, mb = 10 }) => {
  const router = useRouter();
  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      {showBackButton && (
        <View style={styles.backButton}>
          <BackButton router={router} />
        </View>
      )}
      <Text style={styles.title}>{title || ""}</Text>
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
    fontSize: hp(2.7),
    fontFamily: "outfit-bold",
    color: theme.colors.textDark,
  },
    backButton: {
        position: "absolute",
        left: 0,
    },
});
