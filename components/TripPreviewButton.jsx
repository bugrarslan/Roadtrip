import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Ionicons } from "@expo/vector-icons";

const TripPreviewButton = ({ title, content, onPress, icon }) => {
  const trimmedContent = content && content.length > 25 ? content.substring(0, 25) + "..." : content;


  return (
    <Pressable
      style={[styles.container]}
      onPress={() => onPress(onPress)}
    >
      <Ionicons name={icon} size={24} color={theme.colors.dark} />
      <View style={{ gap: 10, backgroundColor: theme.colors.containerColor }}>
        <Text style={styles.title}>{title}</Text>
        {content && (<Text style={styles.text}>{content && trimmedContent}</Text>)}
      </View>
      <Icon name={"arrowRight"} strokeWidth={2.5} color={theme.colors.text}/>
    </Pressable>
  );
};

export default TripPreviewButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(10),
    backgroundColor: theme.colors.containerColor,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  title: {
    color: theme.colors.textDark,
    fontSize: hp(2.5),
    textAlign: "center",
    fontWeight: theme.fonts.semibold
  },
  text: {
    color: theme.colors.textLight,
    fontSize: hp(2),
    textAlign: "center",
    fontWeight: theme.fonts.medium
  },
  icon: {
    fontSize: hp(6),
  },
});
