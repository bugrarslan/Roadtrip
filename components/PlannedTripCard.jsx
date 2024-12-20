import {theme} from "../constants/theme";
import {Image} from "expo-image";
import {getLocationImage, getPhotoRef} from "../services/imageService";
import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";


const PlannedTripCard = ({place}) => {

    const [photoRef, setPhotoRef] = useState(null)

    const GetGooglePhotoRef = async () => {
        const result = await getPhotoRef(place?.Place_name)
        setPhotoRef(result)
    }

    useEffect(() => {
        GetGooglePhotoRef()
    }, [])

    return(
        <View style={{
            backgroundColor: theme.colors.GRAY_LIGHT,
            padding: 10,
            borderRadius: 15,
            borderColor: theme.colors.GRAY,
            marginTop: 20
        }}>
            <Image source={getLocationImage(photoRef)}
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
    )
}

export default PlannedTripCard;