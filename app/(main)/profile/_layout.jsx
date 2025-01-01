import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="editProfile" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
