import {FlatList, StyleSheet, Text, View} from "react-native";
import React from "react";
import {theme} from "../constants/theme";
import HotelCard from "./HotelCard";
import {wp} from "../helpers/common";

const HotelList = ({hotels, t}) => {
  return (
    <View style={{gap: 10}}>
      <Text
        style={{
          fontWeight: theme.fonts.bold,
          fontSize: 20,
        }}
      >
        🏨 {t("hotelList.hotel")}
      </Text>

      <FlatList
        data={hotels}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <HotelCard item={item} t={t}/>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{width: wp(3)}}/>}
      />
    </View>
  );
};

export default HotelList;

const styles = StyleSheet.create({});
