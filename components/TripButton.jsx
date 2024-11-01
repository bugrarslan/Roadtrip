import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const TripButton = ({ onPress, text }) => {
  return (
    <Pressable style={styles.container} onPress={() => onPress(text)}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default TripButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(6.6),
    backgroundColor: theme.colors.WHITE,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  text: {
    color: "black",
    fontSize: hp(2.5),
    fontFamily: "outfit",
  },
});
