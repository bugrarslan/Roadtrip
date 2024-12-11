import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { Image } from "expo-image";
import { hp, wp } from "../helpers/common";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";

const TripCard = ({ item, currentUser, router }) => {
  const handleTripDetails = () => {
    // Detay sayfasına yönlendir
    router.push({
      pathname: "tripDetails",
      params: { tripId: item.id },
    });
  };

  const trimmedTitle = item?.locationInfo?.name.length > 20 ? item?.locationInfo?.name.substring(0, 20) + "..." : item?.locationInfo?.name
  return (
    <Pressable onPress={handleTripDetails} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item?.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
            }}
            contentFit="cover"
            contentPosition="center"
            cachePolicy="memory-disk"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{trimmedTitle}</Text>

          <View style={styles.dateContainer}>
            <MaterialIcons
              name="calendar-today"
              size={wp(4.5)}
              color={theme.colors.GRAY}
            />
            <Text style={styles.date}>
              {moment(item?.dateInfo?.startDate).format("MMM D")} -{" "}
              {moment(item?.dateInfo?.endDate).format("MMM D")}
            </Text>
          </View>

          <View style={styles.otherDetailsContainer}>
            <Text style={styles.otherDetails}>
              {item?.budgetInfo?.title}, {item?.companionInfo?.title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.darkLight,
    borderRadius: hp(2),
    marginVertical: hp(1),

  },
  imageContainer: {
    width: "100%",
    height: hp(25),
    borderTopLeftRadius: hp(2),
    borderTopRightRadius: hp(2),
  },
  image: {
    width: "100%",
    height: hp(25),
    backgroundColor: theme.colors.darkLight,
    borderTopLeftRadius: hp(2),
    borderTopRightRadius: hp(2),
  },
  detailsContainer: {
    gap: hp(0.5),
    paddingLeft: wp(2),
  },
  title: {
    fontSize: wp(8),
    fontFamily: "outfit-medium",
    color: theme.colors.BLACK,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(1),
  },
  date: {
    fontSize: wp(3),
    color: theme.colors.GRAY,
    fontFamily: "outfit",
  },
  otherDetailsContainer: {
    marginBottom: hp(0.5),
  },
  otherDetails: {
    fontSize: wp(4),
    color: theme.colors.GRAY,
    fontFamily: "outfit",
  },
});
