import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import moment from "moment";
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";
import { getLocationImage } from "../services/imageService";

const TripCard = ({ item, onSubmit, index, t }) => {
  const trimmedTitle = item?.locationInfo?.name?.length > 20
    ? item?.locationInfo?.name?.substring(0, 20) + "..."
    : item?.locationInfo?.name;

  return (
    <View>
      {index === 0 ? (
        <Pressable onPress={() => onSubmit(item?.id)}>
          <Image
            source={getLocationImage(item?.locationInfo?.photoRef)}
            style={styles.mainImage}
            contentFit="cover"
            contentPosition="center"
            cachePolicy="memory-disk"
          />
          <View style={styles.marginTop10}>
            <Text style={styles.titleText}>
              {trimmedTitle}
            </Text>
            <View
              style={styles.rowSpaceBetween}
            >
              <Text
                style={styles.grayText}
              >
                {moment(item?.dateInfo?.startDate).format("DD MMM yyyy")}
              </Text>
              <Text
                style={styles.grayText}
              >
                🚌 {item?.companionInfo?.title}
              </Text>
            </View>
            <Pressable
              onPress={() => onSubmit(item?.id)}
              style={styles.submitButton}
            >
              <Text
                style={styles.submitButtonText}
              >
                {t("tripCard.seeYourPlanButton")}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => onSubmit(item?.id)}
          style={styles.rowGap}
        >
          <Image
            source={getLocationImage(item?.locationInfo?.photoRef)}
            style={styles.thumbnailImage}
          />
          <View>
            <Text style={styles.mediumBlackText}>
              {trimmedTitle}
            </Text>
            <Text style={styles.smallGrayText}>
              {moment(item?.dateInfo?.startDate).format("DD MMM yyyy")}
            </Text>
            <Text
              style={styles.smallGrayText}
            >
              {t("tripCard.travellingText")}: {item?.companionInfo?.title}
            </Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  mainImage: {
    width: "100%",
    height: hp(30),
    borderRadius: theme.radius.lg,
  },
  marginTop10: {
    marginTop: hp(1.25),
  },
  titleText: {
    fontSize: wp(6),
    fontFamily: "outfit-medium",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(0.625),
  },
  grayText: {
    fontFamily: "outfit",
    fontSize: wp(4.25),
    color: theme.colors.GRAY,
  },
  submitButton: {
    backgroundColor: "black",
    padding: hp(1.875),
    borderRadius: wp(3.75),
    marginTop: hp(1.25),
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: wp(3.75),
  },
  rowGap: {
    flexDirection: "row",
    gap: wp(2.5),
    alignItems: "center",
  },
  thumbnailImage: {
    width: wp(25),
    height: wp(25),
    borderRadius: theme.radius.lg,
  },
  mediumBlackText: {
    fontFamily: "outfit-medium",
    fontSize: wp(4.5),
    color: "black",
  },
  smallGrayText: {
    fontFamily: "outfit",
    fontSize: wp(3.5),
    color: theme.colors.GRAY,
  },
});
