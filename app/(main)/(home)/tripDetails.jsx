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
import { Image } from "expo-image";
import { getLocationImage } from "../../../services/imageService";
import moment from "moment";
import FlightInfoCard from "../../../components/FlightInfoCard";
import HotelList from "../../../components/HotelList";
import PlannedTrip from "../../../components/PlannedTrip";

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
            marginTop: hp(12.5),
          },
        ]}
      >
        <Text style={styles.notFound}>Trip not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        source={getLocationImage(trip?.locationInfo?.photoRef)}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          {trip?.response?.location}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {moment(trip?.dateInfo?.startDate).format("DD MMM yyyy")}
          </Text>
          <Text style={styles.date}>
            {" "} - {moment(trip?.dateInfo?.endDate).format("DD MMM yyyy")}
          </Text>
        </View>
        <Text style={styles.companion}>
          🚌 {trip?.companionInfo?.title}
        </Text>

        {/* Flight Info */}
        <FlightInfoCard flightDetails={trip?.response?.flightDetails} />

        {/* Hotels List */}
        <HotelList hotels={trip?.response?.hotelOptions} />

        {/* Trip Day Planner Info*/}
        <PlannedTrip details={trip?.response?.itinerary}/>
      </View>
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
    padding: wp(3.75),
    backgroundColor: theme.colors.WHITE,
    height: "100%",
    marginTop: hp(-3.75),
    borderTopLeftRadius: wp(7.5),
    borderTopRightRadius: wp(7.5),
    paddingBottom: hp(13),
  },
  title: {
    fontSize: wp(6.25),
    fontFamily: "outfit-bold",
  },
  dateContainer: {
    flexDirection: "row",
    display: "flex",
    gap: wp(1.25),
    marginTop: hp(0.625),
  },
  date: {
    fontFamily: "outfit",
    fontSize: wp(4.5),
    color: theme.colors.GRAY,
  },
  companion: {
    fontFamily: "outfit",
    fontSize: wp(4.25),
    color: theme.colors.GRAY,
    marginTop: hp(1.25),
  },
});