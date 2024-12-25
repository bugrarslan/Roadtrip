import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import * as Linking from "expo-linking";
import {hp} from "../helpers/common";
 
const FlightInfoCard = ({ flightDetails }) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.containerColor,
        padding: 10,
        borderRadius: theme.radius.xxl,
        borderCurve: "continuous",
        gap: 5,
      }}
    >
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text style={{ fontWeight: theme.fonts.extraBold,  fontSize: hp(2) }}>
          ✈️ Flight
        </Text>
        <Pressable
          style={{
            backgroundColor: theme.colors.PRIMARY,
            padding: hp(1),
            width: 100,
            borderRadius: theme.radius.lg,
          }}
          onPress={() => {
            Linking.openURL(flightDetails[0]?.booking_URL);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: theme.colors.WHITE,
              fontWeight: theme.fonts.medium,
            }}
          >
            Book Here
          </Text>
        </Pressable>
      </View>

      <Text
        style={{
          fontWeight: theme.fonts.medium,
          fontSize: hp(1.8),
        }}
      >
        Airline: {flightDetails[0]?.Flight_name}
      </Text>

      <Text
        style={{
          fontWeight: theme.fonts.medium,
          fontSize: hp(1.8),
        }}
      >
        Price: {flightDetails[0]?.flight_price}
      </Text>
    </View>
  );
};

export default FlightInfoCard;

const styles = StyleSheet.create({});
