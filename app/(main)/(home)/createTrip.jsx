import {Alert, StyleSheet, Text, View} from "react-native";
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
import Header from "../../../components/Header";
import {useTranslation} from "react-i18next";

const createTrip = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { tripData, setTripData } = useTrip();

  const onSubmitDestination = () => {
    router.push("/destinationSelectModal");
  };
  const onSubmitCompanion = () => {
    router.push("/companionSelectModal");
  };
  const onSubmitDate = () => {
    router.push("/dateSelectModal");
  };
  const onSubmitBudget = () => {
    router.push("/budgetSelectModal");
  };
  const handleCreate = () => {
    if (tripData?.locationInfo && tripData?.companionInfo && tripData?.dateInfo && tripData?.budgetInfo) {
      router.replace("(main)/(home)/loading");
    } else {
      Alert.alert(t("createTrip.alertTitle"), t("createTrip.alertContent"), [
        {
          text: t("createTrip.alertButton"),
          onPress: () => {},
        },
      ]);
    }
  }

  useEffect(() => {
  }, []);

  return (
    <ScreenWrapper backgroundColor={theme.colors.WHITE}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Header title={t("createTrip.headerTitle")} showBackButton isResetContext/>
        <View style={styles.content}>
          <TripPreviewButton
            title={t("createTrip.destination")}
            content={tripData?.locationInfo?.name}
            onPress={onSubmitDestination}
            icon={"location-sharp"}
          />
          <TripPreviewButton
            title={t("createTrip.companion")}
            content={tripData?.companionInfo?.title}
            onPress={onSubmitCompanion}
            icon={"people-sharp"}
          />
          <TripPreviewButton
            title={t("createTrip.days")}
            content={ tripData?.dateInfo?.totalNoOfDays &&
              moment(tripData?.dateInfo?.startDate).format("DD MMM") +
              " - " +
              moment(tripData?.dateInfo?.endDate).format("DD MMM") +
              " (" +
              tripData?.dateInfo?.totalNoOfDays +
              " days)"
            }
            onPress={onSubmitDate}
            icon={"calendar-sharp"}
          />
          <TripPreviewButton
            title={t("createTrip.budget")}
            content={tripData?.budgetInfo?.title}
            onPress={onSubmitBudget}
            icon={"cash-sharp"}
          />
          <Button title={t("createTrip.createButton")} onPress={handleCreate} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default createTrip;

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
