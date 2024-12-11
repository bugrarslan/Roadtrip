import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { hp } from "../helpers/common";
import Button from "./Button";

const StartNewTripCard = ({ handleNewTrip }) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="location-on" size={hp(5)} color="black" />
      <Text
        style={{
          fontSize: hp(3),
          fontFamily: "outfit-medium",
          marginTop: hp(2),
          textAlign: "center",
        }}
      >
        You don't have any trips planned yet
      </Text>
      <Text
        style={{
          fontSize: hp(2),
          fontFamily: "outfit",
          marginTop: hp(2),
          textAlign: "center",
        }}
      >
        It seems like it's time to plan a new travel experience! Let's get
        started
      </Text>
      <Button
        onPress={handleNewTrip}
        title="Start a new trip"
        buttonStyle={{ paddingHorizontal: hp(5), marginTop: hp(2) }}
        textStyle={{ fontFamily: "outfit" }}
      />
    </View>
  );
};

export default StartNewTripCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
