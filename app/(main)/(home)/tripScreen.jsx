import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useRouter } from "expo-router";
import Button from "../../../components/Button";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import { StatusBar } from "expo-status-bar";
import BackButton from "../../../components/BackButton";
import { useTrip } from "../../../contexts/TripContext";
import TripPreviewButton from "../../../components/TripPreviewButton";
import moment from "moment";

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
        <View style={styles.content}>
          <TripPreviewButton
            title={"Nereye?"}
            content={tripData?.locationInfo?.name}
            onPress={onSubmitDestination}
            icon={"location-sharp"}
          />
          <TripPreviewButton
            title={"Kiminle?"}
            content={tripData?.companion?.title}
            onPress={onSubmitCompanion}
            icon={"people-sharp"}
          />
          <TripPreviewButton
            title={"Hangi Günler?"}
            content={
              moment(tripData?.startDate).format("DD MMM") +
              " - " +
              moment(tripData?.endDate).format("DD MMM") +
              " (" +
              tripData?.totalNoOfDays +
              " gün)"
            }
            onPress={onSubmitDate}
            icon={"calendar-sharp"}
          />
          <TripPreviewButton
            title={"Bütçe?"}
            content={tripData?.budget?.title}
            onPress={onSubmitBudget}
            icon={"cash-sharp"}
          />
          <Button title="Oluştur!" onPress={() => console.log("submit")} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.WHITE,
    paddingHorizontal: wp(5),
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
  content: { flex: 1, marginTop: hp(2) , gap: hp(2) },
});
