import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
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
import HotelCard from "../../../components/HotelCard";

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
          { justifyContent: "flex-start", marginTop: 100 },
        ]}
      >
        <Text style={styles.notFound}>Trip not found!</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper backgroundColor={"white"}>
      <View style={styles.container}>
        <View style={{paddingHorizontal: wp(4)}}>
          <Header title={trip?.response?.location} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {/* image */}
          <Image
            style={styles.image}
            source={getLocationImage(trip?.locationInfo?.photoRef)}
            contentFit="cover"
            contentPosition="center"
            cachePolicy="memory-disk"
          />

          {/* info */}
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{trip?.response?.location}</Text>
            <Text style={styles.dates}>
              {moment(trip?.dateInfo?.startDate).format("MMM DD, YYYY")} -{" "}
              {moment(trip?.dateInfo?.endDate).format("MMM DD, YYYY")}
            </Text>
            <Text style={styles.companion}>
              Travelling: {trip?.companionInfo?.title} {trip?.companionInfo?.icon}
            </Text>
            <Text style={styles.budget}>
              Budget: {trip?.budgetInfo?.title} {trip?.budgetInfo?.icon}
            </Text>
          </View>

          {/* hotels */}
          <View style={styles.hotelsContainer}>
            <Text style={styles.title}>Hotels</Text>
            <FlatList
              data={trip?.response?.hotelOptions}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <HotelCard item={item} router={router}/>
              )}
              ItemSeparatorComponent={() => <View style={{ width: wp(2) }} />}
            />
          </View>

          {console.log(trip?.response?.itinerary.day1)}

          {/* activities */}
          
        </ScrollView>
      </View>
    </ScreenWrapper>
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
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingVertical: wp(7),
    //paddingHorizontal: wp(4),
  },
  list: {
    backgroundColor: "white",
    paddingBottom: hp(12),
  },
  image: {
    height: hp(30),
    backgroundColor: theme.colors.darkLight,
    borderRadius: hp(2),
  },
  infoContainer: {
    padding: wp(4),
    gap: hp(0.7),
  },
  title: {
    fontSize: hp(3),
    fontFamily: "outfit-bold",
    color: theme.colors.textDark,
  },
  dates: {
    fontSize: hp(2),
    color: theme.colors.textDark,
  },
  companion: {
    fontSize: hp(2),
    color: theme.colors.textLight,
  },
  budget: {
    fontSize: hp(2),
    color: theme.colors.textLight,
  },
  hotelsContainer: {
    padding: wp(4)
  },
});
