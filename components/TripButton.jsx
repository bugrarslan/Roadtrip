import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { hp } from "../helpers/common";

const TripButton = ({ option, setSelected, selected }) => {
  return (
    <Pressable style={[styles.container, selected?.id == option?.id && {borderWidth: 2}]} onPress={() => setSelected(option)}>
      <View style={{ gap: 10, backgroundColor: theme.colors.GRAY_LIGHT }}>
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
