import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Button from "../../../components/Button";
import { supabase } from "../../../lib/supabase";
import { StatusBar } from "expo-status-bar";
import { wp } from "../../../helpers/common";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import StartNewTripCard from "../../../components/StartNewTripCard";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);

  const newTripClicked = () => {
    router.push("tripScreen");
  };

  return (
    <ScreenWrapper backgroundColor={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>Seyahatlerim</Text>
          <Pressable onPress={newTripClicked}>
            <MaterialIcons name="add-circle" size={30} color="black" />
          </Pressable>
        </View>

        {/* content */}
        {userTrips.length === 0 ? (
          <StartNewTripCard handleNewTrip={newTripClicked} />
        ) : null}
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    fontSize: 35,
    fontFamily: "outfit-bold",
  },
});
