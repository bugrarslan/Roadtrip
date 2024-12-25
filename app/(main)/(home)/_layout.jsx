import {StyleSheet} from "react-native";
import React from "react";
import {Stack} from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="createTrip" options={{headerShown: false}}/>
      <Stack.Screen name="loading" options={{headerShown: false}}/>
      <Stack.Screen
        name="destinationSelectModal"
        options={{headerShown: false, presentation: "modal"}}
      />
      <Stack.Screen
        name="companionSelectModal"
        options={{headerShown: false, presentation: "modal"}}
      />
      <Stack.Screen
        name="dateSelectModal"
        options={{headerShown: false, presentation: "modal"}}
      />
      <Stack.Screen
        name="budgetSelectModal"
        options={{headerShown: false, presentation: "modal"}}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
