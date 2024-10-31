import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { TripProvider } from "../../../contexts/TripContext";

const _layout = () => {
  return (
    <TripProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="tripScreen" options={{ headerShown: false }} />
        <Stack.Screen
          name="destinationSelectModal"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="companionSelectModal"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="dateSelectModal"
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Stack.Screen
          name="budgetSelectModal"
          options={{ headerShown: false, presentation: "modal" }}
        />
      </Stack>
    </TripProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
