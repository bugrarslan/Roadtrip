import {FlatList, StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import {Image} from "expo-image";
import {theme} from "../constants/theme";
import {getPhotoRef} from "../services/imageService";
import HotelCard from "./HotelCard";

const HotelList = ({hotels}) => {
    return (
        <View
            style={{
                marginTop: 20,
            }}
        >
            <Text
                style={{
                    fontFamily: "outfit-bold",
                    fontSize: 20,
                }}
            >
                🏨 Hotel Recommendation
            </Text>

            <FlatList
                data={hotels}
                style={{
                    marginTop: 7,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                    <HotelCard item={item}/>
                )}
            />
        </View>
    );
};

export default HotelList;

const styles = StyleSheet.create({});
