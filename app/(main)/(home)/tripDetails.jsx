import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchTripDetails, removeTrip } from "../../../services/tripService";
import Loading from "../../../components/Loading";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { Image } from "expo-image";
import { getLocationImage } from "../../../services/imageService";
import moment from "moment";
import FlightInfoCard from "../../../components/FlightInfoCard";
import HotelList from "../../../components/HotelList";

const tripDetails = () => {
  const router = useRouter();
  const { tripId } = useLocalSearchParams();

  const [trip, setTrip] = useState(null);
  const [startLoading, setStartLoading] = useState(true);

  useEffect(() => {
    getTripDetails();
  }, [tripId]);

  const getTripDetails = async () => {
    const { success, data } = await fetchTripDetails(tripId);
    if (success) {
      setTrip(data);
    } else {
      Alert.alert("Error", "Could not fetch trip details");
    }
    setStartLoading(false);
  };

  const onDeleteTrip = async (trip) => {
    let res = await removeTrip(trip.id);
    if (res.success) router.back();
    else Alert.alert("Trip", res.msg);
  };

  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading />
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
            marginTop: 100,
          },
        ]}
      >
        <Text style={styles.notFound}>Trip not found!</Text>
      </View>
    );
  }

  return (
    <View>
      <Image
        source={getLocationImage(trip?.locationInfo?.photoRef)}
        style={{
          width: "100%",
          height: 330,
        }}
      />
      <View
        style={{
          padding: 15,
          backgroundColor: theme.colors.WHITE,
          height: "100%",
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>
          {trip?.response?.location}
        </Text>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            gap: 5,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: theme.colors.GRAY,
            }}
          >
            {moment(trip?.dateInfo?.startDate).format("DD MMM yyyy")}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: theme.colors.GRAY,
            }}
          >
            {" "}
            - {moment(trip?.dateInfo?.endDate).format("DD MMM yyyy")}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: wp(4.25),
            color: theme.colors.GRAY,
          }}
        >
          🚌 {trip?.companionInfo?.title}
        </Text>

        {/* Flight Info */}
        <FlightInfoCard flightDetails={trip?.response?.flightDetails} />

        {/* Hotels List */}
        <HotelList hotels={trip?.response?.hotelOptions} />

        {/* Trip Day Planner Info*/}
      </View>
    </View>
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
  }
});
