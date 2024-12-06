import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { Image } from "expo-image";

const TripCard = ({ item, currentUser, router }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photo_reference=${item?.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`}
        contentFit="cover"
      />
      <Text style={styles.title}>{item?.locationInfo?.name}</Text>
    </View>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkLight,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.GRAY,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  image: {
    flex: 1,
    height: 200,
    backgroundColor: "#0553",
  },
});
