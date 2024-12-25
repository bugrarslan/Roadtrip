import {FlatList, StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import {Image} from "expo-image";
import {theme} from "../constants/theme";
import {getPhotoRef} from "../services/imageService";
import HotelCard from "./HotelCard";
import {wp} from "../helpers/common";

const HotelList = ({hotels}) => {
  return (
    <View style={{gap: 10}}>
      <Text
        style={{
          fontWeight: theme.fonts.bold,
          fontSize: 20,
        }}
      >
        🏨 Hotel Recommendation
      </Text>

      <FlatList
        data={hotels}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <HotelCard item={item}/>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{width: wp(3)}}/>}
      />
    </View>
  );
};

export default HotelList;

const styles = StyleSheet.create({});
