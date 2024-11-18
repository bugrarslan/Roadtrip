import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";

const TripPreviewButton = ({ title, content, onPress, icon }) => {
  return (
    <Pressable
      style={[styles.container, { borderWidth: 2 }]}
      onPress={() => onPress(onPress)}
    >
      <Ionicons name={icon} size={24} color={theme.colors.dark} />
      <View style={{ gap: 10, backgroundColor: theme.colors.GRAY_LIGHT }}>
        <Text style={styles.title}>{title}</Text>
        {content && (<Text style={styles.text}>{content && content}</Text>)}
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.PRIMARY} />
    </Pressable>
  );
};

export default TripPreviewButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(10),
    backgroundColor: theme.colors.GRAY_LIGHT,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  title: {
    color: "black",
    fontSize: hp(2.5),
    fontFamily: "outfit-bold",
  },
  text: {
    color: "gray",
    fontSize: hp(2),
    fontFamily: "outfit",
  },
  icon: {
    fontSize: hp(6),
  },
});
