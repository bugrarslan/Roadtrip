import {theme} from "../constants/theme";
import {Image} from "expo-image";
import {getLocationImage, getPhotoRef} from "../services/imageService";
import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";


const PlannedTripCard = ({place, t}) => {

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
            backgroundColor: theme.colors.containerColor,
            padding: 10,
            borderRadius: 15,
            marginTop: 20
        }}>
            <Image
              source={getLocationImage(photoRef)}
              style={{width: "100%", aspectRatio:16/9, borderRadius: 15}}
              cachePolicy="memory"
              contentFit={"cover"}
            />
            <View>
                <Text style={{fontWeight: theme.fonts.bold, fontSize: 20}}>{place?.Place_name}</Text>
                <Text style={{
                    fontWeight: theme.fonts.medium,
                    fontSize: 17,
                    color: theme.colors.text
                }}>{place?.Description}</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    overflow: "scroll"
                }}>
                    <View>
                        <Text style={{fontWeight: theme.fonts.medium, fontSize: 17, marginTop: 5}}>
                            🎟️ {t("plannedTripCard.price")}: <Text
                                style={{fontWeight: theme.fonts.bold}}>{place?.Ticket_pricing} {t("plannedTripCard.currency")}</Text></Text>
                        <Text style={{fontWeight: theme.fonts.medium, fontSize: 17, marginTop: 5}}>
                            ⏱️ {t("plannedTripCard.time")}: <Text
                                style={{fontWeight: theme.fonts.bold}}>{place?.Travel_time_to_the_location_from_the_hotel}</Text></Text>
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