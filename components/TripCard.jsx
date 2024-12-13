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
import { getLocationImage } from "../services/imageService";

const TripCard = ({ item, router, onSubmit, index }) => {
  const trimmedTitle =
    item?.locationInfo?.name.length > 20
      ? item?.locationInfo?.name.substring(0, 20) + "..."
      : item?.locationInfo?.name;

  return (
    <Pressable onPress={() => onSubmit(item.id)} activeOpacity={0.7}>
      {index === 0 ? (
        <View>
          <Image
            source={getLocationImage(item?.locationInfo?.photoRef)}
            style={{ width: "100%", height: 240, borderRadius: 15 }}
            contentFit="cover"
            contentPosition="center"
            cachePolicy="memory-disk"
          />
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 24, fontFamily: "outfit-medium" }}>
              {item?.response?.location}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                display: "flex",
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 17,
                  color: theme.colors.GRAY,
                }}
              >
                {moment(item?.dateInfo?.startDate).format("DD MMM yyyy")}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 17,
                  color: theme.colors.GRAY,
                }}
              >
                🚌 {item?.companionInfo?.title}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                padding: 15,
                borderRadius: 15,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "outfit-medium",
                  fontSize: 15,
                }}
              >
                See your Plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flexDirection: "row", gap: 10, display: "flex", alignItems: "center"}}>
          <Image
            source={getLocationImage(item?.locationInfo?.photoRef)}
            style={{ width: 100, height: 100, borderRadius: 15 }}
          />
          <View>
            <Text style={{fontFamily: "outfit-medium", fontSize: 18, color: "black"}}>{item?.locationInfo?.name}</Text>
            <Text style={{fontFamily: "outfit", fontSize: 14, color: theme.colors.GRAY}}>{moment(item?.dateInfo?.startDate).format("DD MMM yyyy")}</Text>
            <Text style={{fontFamily: "outfit", fontSize: 14, color: theme.colors.GRAY}}>Travelling: {item?.companionInfo?.title}</Text>
          </View>
        </View>
      )}
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
