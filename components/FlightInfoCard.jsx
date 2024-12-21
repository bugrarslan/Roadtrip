import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import * as Linking from "expo-linking";
 
const FlightInfoCard = ({ flightDetails }) => {
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: theme.colors.GRAY_LIGHT,
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 15
      }}
    >
      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          ✈️ Flight
        </Text>
        <Pressable
          style={{
            backgroundColor: theme.colors.PRIMARY,
            padding: 5,
            width: 100,
            borderRadius: 7,
            marginTop: 7,
          }}
          onPress={() => {
            Linking.openURL(flightDetails[0]?.booking_URL);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: theme.colors.WHITE,
              fontFamily: "outfit",
            }}
          >
            Book Here
          </Text>
        </Pressable>
      </View>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
          marginTop: 7,
        }}
      >
        Airline: {flightDetails[0]?.Flight_name}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
        }}
      >
        Price: {flightDetails[0]?.flight_price}
      </Text>
    </View>
  );
};

export default FlightInfoCard;

const styles = StyleSheet.create({});
