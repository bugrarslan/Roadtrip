import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";

const HotelCard = ({ item, router }) => {
  const onSubmit = () => {
    console.log("HotelCard: ", item);
  };

  return (
    <Pressable style={styles.container} onPress={onSubmit}>
      {/* <Image
        style={styles.hotelImage}
        source={{
          uri: item?.imageUrl,
        }}
        contentFit="cover"
        contentPosition="center"
      /> */}
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{item?.hotelName}</Text>
        <Text style={styles.hotelRating}>Rating: {item?.rating}</Text>
        <Text style={styles.hotelPrice}>Price: {item?.price} $</Text>
        {/* <Text style={styles.hotelAddress}>Address: {item.address}</Text> */}
        <Text style={styles.hotelDescription}>{item?.description}</Text>
      </View>
    </Pressable>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  container: {
    width: wp(60),
    backgroundColor: theme.colors.darkLight,
    borderRadius: hp(2),
    padding: wp(2),
  },
  hotelInfo: {
    padding: wp(2),
    gap: hp(0.5),
  },
  hotelName: {
    fontSize: hp(2.5),
    fontFamily: "outfit-medium",
    color: theme.colors.textDark,
  },
  hotelRating: {
    fontSize: hp(2),
    fontFamily: "outfit",
    color: theme.colors.textLight,
  },
  hotelPrice: {
    fontSize: hp(2),
    fontFamily: "outfit",
    color: theme.colors.textLight,
  },
  // hotelAddress: {
  //   fontSize: hp(2),
  //   fontFamily: "outfit",
  //   color: theme.colors.textLight,
  // },
  hotelDescription: {
    fontSize: hp(1.5),
    fontFamily: "outfit",
    color: theme.colors.dark,
  },
  hotelImage: {
    width: wp(60),
    height: hp(20),
    borderTopLeftRadius: hp(2),
    borderTopRightRadius: hp(2),
  },
});
