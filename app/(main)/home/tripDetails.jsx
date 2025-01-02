import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fetchTripDetails, removeTrip } from "../../../services/tripService";
import Loading from "../../../components/Loading";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import { getLocationImage } from "../../../services/imageService";
import FlightInfoCard from "../../../components/FlightInfoCard";
import HotelList from "../../../components/HotelList";
import PlannedTripList from "../../../components/PlannedTripList";
import BackButton from "../../../components/BackButton";
import {
  SelectBudgetList,
  SelectTravellerList,
} from "../../../constants/tripOptions";
import CustomAlert from "../../../components/CustomAlert";

const tripDetails = () => {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const { t } = useTranslation();

  const [trip, setTrip] = useState(null);
  const [startLoading, setStartLoading] = useState(true);

  // custom alert
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({buttons: []});

  const showAlert = (data) => {
    setAlertVisible(true);
    setAlertData(data);
  };

  const closeAlert = () => {
    setAlertVisible(false);
    setAlertData({buttons: []});
  };

  useEffect(() => {
    tripId && getTripDetails();
  }, [tripId]);

  const getTripDetails = async () => {
    const { success, data } = await fetchTripDetails(tripId);
    if (success) {
      setTrip(data);
    } else {
      showAlert({
        type: "error",
        title: t("alert.error"),
        content: t("alert.errorOccurred"),
        buttons: [
          {
            text: t("alert.ok"),
            onPress: () => closeAlert(),
          },
        ],
      });
      return;
    }
    setStartLoading(false);
  };

  const onDeleteTrip = async (trip) => {
    let res = await removeTrip(trip.id);
    if (res.success) router.back();
    else {
      showAlert({
        type: "error",
        title: t("alert.error"),
        content: t("alert.errorOccurred"),
        buttons: [
          {
            text: t("alert.ok"),
            onPress: () => closeAlert(),
          },
        ],
      });
      return;
    }
  };

  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading size={"large"} />
      </View>
    );
  }

  if (!trip) {
    return (
      <View
        style={[
          styles.center,
          {
            justifyContent: "flex-start",
            marginTop: hp(12.5),
          },
        ]}
      >
        <Text style={styles.notFound}>{t("tripDetails.notFound")}</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar style="auto" />
      <View>
        <View
          style={{
            position: "absolute",
            left: wp(4),
            top: paddingTop,
            zIndex: 1,
          }}
        >
          <BackButton
            router={router}
            buttonStyle={{ backgroundColor: theme.colors.containerColor }}
          />
        </View>
        <Image
          source={getLocationImage(trip?.locationInfo?.photoRef)}
          style={styles.image}
          cachePolicy="memory"
        />
        <View style={styles.detailsContainer}>
          <View style={{ gap: 5 }}>
            <Text style={styles.title}>{trip?.locationInfo?.name}</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>
                {moment(trip?.dateInfo?.startDate).format("DD MMM yyyy")}
              </Text>
              <Text style={styles.date}>
                {" "}
                - {moment(trip?.dateInfo?.endDate).format("DD MMM yyyy")}
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text style={styles.companion}>
                🚌 {SelectTravellerList(t)[trip?.companionInfo?.id - 1].title}
              </Text>
              <Text style={styles.companion}>
                💰 {SelectBudgetList(t)[trip?.budgetInfo?.id - 1].title}
              </Text>
            </View>
          </View>

          {/* Flight Info */}
          <FlightInfoCard
            flightDetails={trip?.response?.Flight_Details}
            t={t}
          />

          {/* Hotels List */}
          <HotelList hotels={trip?.response?.Hotel_Options} t={t} />

          {/* Trip Day Planner Info*/}
          <PlannedTripList details={trip?.response?.Day_by_Day_Plan} t={t} />
        </View>
      </View>
      <CustomAlert
        visible={isAlertVisible}
        onClose={closeAlert}
        title={alertData?.title}
        message={alertData?.content}
        buttons={alertData?.buttons}
      />
    </ScrollView>
  );
};

export default tripDetails;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium,
  },
  image: {
    width: "100%",
    height: hp(39),
  },
  detailsContainer: {
    padding: wp(4),
    backgroundColor: "white",
    height: "100%",
    marginTop: hp(-3.75),
    borderTopLeftRadius: theme.radius.xxl,
    borderTopRightRadius: theme.radius.xxl,
    paddingBottom: hp(13),
    gap: 15,
  },
  title: {
    fontSize: wp(7),
    fontWeight: theme.fonts.extraBold,
    color: theme.colors.textDark,
  },
  dateContainer: {
    flexDirection: "row",
  },
  date: {
    fontWeight: theme.fonts.medium,
    fontSize: wp(5),
    color: theme.colors.text,
  },
  companion: {
    fontWeight: theme.fonts.medium,
    fontSize: wp(4),
    color: theme.colors.textLight,
  },
});
