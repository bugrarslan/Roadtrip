import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {theme} from '../constants/theme'
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {getLocationImage, getPhotoRef} from "../services/imageService";
import PlannedTripCard from "./PlannedTripCard";

const PlannedTripList = ({details}) => {

    return (
        <View style={{
            marginTop: 20,
            backgroundColor: theme.colors.WHITE
        }}>
            <Text style={{
                fontSize: 20,
                fontFamily: "outfit-bold",
            }}>🏕️ Plan Details</Text>

            {details.map((item) => (
                <View>
                    <View>
                        <Text style={{
                            fontSize: 20,
                            fontFamily: "outfit-medium",
                            marginTop: 20
                        }}>
                            {item?.Day}
                        </Text>
                        <Text style={{fontSize: 15, fontFamily: "outfit", marginTop: 10}}>⚫ Time to travel between
                            locations: {item?.Travel_time_between_locations}</Text>
                        <Text style={{fontSize: 15, fontFamily: "outfit", marginTop: 10}}>🟢 Best Time to Visit Each
                            Place: {item?.Best_times_to_visit_each_place}</Text>
                    </View>
                    {item?.Activities_or_places_to_visit_for_each_day.map((place) => (
                        <PlannedTripCard place={place}/>
                    ))}
                </View>
            ))}
        </View>
    )
}

export default PlannedTripList

const styles = StyleSheet.create({})