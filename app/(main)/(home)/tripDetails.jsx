import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {useEffect, useState} from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import {fetchTripDetails, removeTrip} from "../../../services/tripService";
import Loading from "../../../components/Loading";
import {hp, wp} from "../../../helpers/common";
import {theme} from "../../../constants/theme";
import {Image} from "expo-image";
import {getLocationImage} from "../../../services/imageService";
import moment from "moment";
import FlightInfoCard from "../../../components/FlightInfoCard";
import HotelList from "../../../components/HotelList";
import PlannedTripList from "../../../components/PlannedTripList";
import {StatusBar} from "expo-status-bar";
import BackButton from "../../../components/BackButton";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const tripDetails = () => {
  const router = useRouter();
  const {tripId} = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  const [trip, setTrip] = useState(null);
  const [startLoading, setStartLoading] = useState(true);

  useEffect(() => {
    tripId && getTripDetails();
  }, [tripId]);

  const getTripDetails = async () => {
    const {success, data} = await fetchTripDetails(tripId);
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
        <Loading size={"large"}/>
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar style="auto"/>
      <View style={{position: "absolute", left: wp(4), top: paddingTop, zIndex: 1}}>
        <BackButton router={router} buttonStyle={{backgroundColor: theme.colors.containerColor}}/>
      </View>
      <Image
        source={getLocationImage(trip?.locationInfo?.photoRef)}
        style={styles.image}
        cachePolicy="memory"
      />
      <View style={styles.detailsContainer}>
        <View style={{gap: 5}}>
          <Text style={styles.title}>{trip?.locationInfo?.name}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {moment(trip?.dateInfo?.startDate).format("DD MMM yyyy")}
            </Text>
            <Text style={styles.date}> - {moment(trip?.dateInfo?.endDate).format("DD MMM yyyy")}
            </Text>
          </View>
          <View style={{gap: 5}}>
            <Text style={styles.companion}>🚌 {trip?.companionInfo?.title}</Text>
            <Text style={styles.companion}>💰 {trip?.budgetInfo?.title}</Text>
          </View>
        </View>

        {/* Flight Info */}
        <FlightInfoCard flightDetails={trip?.response?.Flight_Details}/>

        {/* Hotels List */}
        <HotelList hotels={trip?.response?.Hotel_Options}/>

        {/* Trip Day Planner Info*/}
        <PlannedTripList details={trip?.response?.Day_by_Day_Plan}/>
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
    padding: wp(4),
    backgroundColor: theme.colors.WHITE,
    height: "100%",
    marginTop: hp(-3.75),
    borderTopLeftRadius: theme.radius.xxl,
    borderTopRightRadius: theme.radius.xxl,
    paddingBottom: hp(13),
    gap: 15
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
