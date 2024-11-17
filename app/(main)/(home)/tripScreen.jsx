import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useRouter } from "expo-router";
import Button from "../../../components/Button";
import { wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../../components/BackButton";
import { useTrip } from "../../../contexts/TripContext";

const Page = () => {
  const router = useRouter();
  const { tripData, setTripData } = useTrip();

  const onSubmitDestination = () => {
    router.push("destinationSelectModal");
  };
  const onSubmitCompanion = () => {
    router.push("companionSelectModal");
  };
  const onSubmitDate = () => {
    router.push("dateSelectModal");
  };
  const onSubmitBudget = () => {
    router.push("budgetSelectModal");
  };

  useEffect(() => {
    console.log(tripData);
  }, []);

  return (
    <ScreenWrapper backgroundColor={theme.colors.WHITE}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton router={router} />
          <Text style={styles.title}>Seyahatini oluşturalım</Text>
        </View>
        <Button title="Destination" onPress={onSubmitDestination} />
        <Button title="Companion" onPress={onSubmitCompanion} />
        <Button title="Date" onPress={onSubmitDate} />
        <Button title="Budget" onPress={onSubmitBudget} />
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.WHITE,
    paddingHorizontal: wp(5),
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: wp(5),
    fontFamily: "outfit-bold",
    textAlign: "center",
    flex: 1,
  },
});
