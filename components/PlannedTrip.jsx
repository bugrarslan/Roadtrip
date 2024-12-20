import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {theme} from '../constants/theme'
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";

const PlannedTrip = ({details}) => {
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
                        <Text style={{fontSize: 15, fontFamily: "outfit", marginTop: 10}}>🟢 Time to travel between locations: {item?.Travel_time_between_locations}</Text>
                        <Text style={{fontSize: 15, fontFamily: "outfit", marginTop: 10}}>🟢 Best Time to Visit Each Place: {item?.Best_times_to_visit_each_place}</Text>
                    </View>
                    {item?.Activities_or_places_to_visit_for_each_day.map((place) => (
                        <View style={{
                            backgroundColor: theme.colors.GRAY_LIGHT,
                            padding: 10,
                            borderRadius: 15,
                            borderColor: theme.colors.GRAY,
                            marginTop: 20
                        }}>
                            <Image source={require('../assets/images/icon.png')}
                                   style={{width: "100%", height: 120, borderRadius: 15}}/>
                            <View>
                                <Text style={{fontFamily: "outfit-bold", fontSize: 20}}>{place?.Place_name}</Text>
                                <Text style={{
                                    fontFamily: "outfit",
                                    fontSize: 17,
                                    color: theme.colors.GRAY
                                }}>{place?.Description}</Text>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    overflow: "scroll"
                                }}>
                                    <View>
                                        <Text style={{fontFamily: "outfit", fontSize: 17, marginTop: 5}}>🎟️ Ticket
                                            Price: <Text
                                                style={{fontFamily: "outfit-medium"}}>{place?.Ticket_pricing}</Text></Text>
                                        <Text style={{fontFamily: "outfit", fontSize: 17, marginTop: 5}}>⏱️ Time to
                                            Travel: <Text
                                                style={{fontFamily: "outfit-medium"}}>{place?.Travel_time_to_the_location_from_the_hotel}</Text></Text>
                                    </View>
                                    <TouchableOpacity style={{
                                        backgroundColor: theme.colors.PRIMARY,
                                        padding: 8,
                                        borderRadius: 7
                                    }}><Ionicons name={"navigate"} size={20} color={"white"}/></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    )
}

export default PlannedTrip

const styles = StyleSheet.create({})