import {Pressable, StyleSheet} from "react-native";
import React from "react";
import Icon from "../assets/icons";
import {theme} from "../constants/theme";

const CloseButton = ({size = 26, router}) => {
  return (
    <Pressable style={styles.button} onPress={() => router.back()}>
      <Icon name={"cancel"} strokeWidth={2.5} color={theme.colors.text}/>
    </Pressable>
  );
};

export default CloseButton;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
});
