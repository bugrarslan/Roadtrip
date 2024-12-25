import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const TripButton = ({ option, selected, onSelect }) => {
  return (
    <Pressable style={[styles.container, selected?.id == option?.id && {borderWidth: 2}]} onPress={() => onSelect(option)}>
      <View style={{ gap: 10, backgroundColor: theme.colors.containerColor }}>
        <Text style={styles.title}>{option?.title}</Text>
        <Text style={styles.text}>{option?.description}</Text>
      </View>
      <Text style={styles.icon}>{option?.icon}</Text>
    </Pressable>
  );
};

export default TripButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: hp(11),
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
    fontWeight: theme.fonts.semibold,
  },
  text: {
    color: theme.colors.textLight,
    fontSize: hp(2),
    fontWeight: theme.fonts.medium,
  },
  icon: {
    fontSize: hp(5),
  },
});
