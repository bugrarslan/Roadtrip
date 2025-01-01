import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="budgetSelectModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="companionSelectModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="createTrip" />
      <Stack.Screen
        name="dateSelectModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="destinationSelectModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="loading" />
      <Stack.Screen name="tripDetails" />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
