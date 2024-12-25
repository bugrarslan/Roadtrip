import {theme} from "../constants/theme";
import {Image} from "expo-image";
import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {getLocationImage, getPhotoRef} from "../services/imageService";
import {hp, wp} from "../helpers/common";

const HotelCard = ({item}) => {

    const [photoRef, setPhotoRef] = useState(null)

    const GetGooglePhotoRef = async () => {
        const result = await getPhotoRef(item?.Hotel_name)
        setPhotoRef(result)
    }

    useEffect(() => {
        GetGooglePhotoRef()
    }, [])

    const trimmedName = (name) => {
        if (name.length > 20) {
            return (name.substring(0, 20) + "...")
        } else {
            return name
        }
    }
    return (
        <View style={{
            flex: 1,
            width: wp(50),
            backgroundColor: theme.colors.containerColor,
            borderRadius: theme.radius.md,
        }}>
            <Image
                source={getLocationImage(photoRef)}
                style={{
                    width: wp(50),
                    height: hp(13),
                    borderRadius: theme.radius.md,
                }}
                cachePolicy="memory"
            />
            <View style={{
                padding: wp(2),
            }}>
                <Text style={{
                    fontWeight: theme.fonts.medium,
                    fontSize: hp(1.7),

                }}>
                    {trimmedName(item?.Hotel_name)}
                </Text>

                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{
                        fontWeight: theme.fonts.medium,
                        fontSize: hp(1.5),
                    }}>⭐ {item?.Rating}</Text>
                    <Text style={{
                        fontWeight: theme.fonts.medium,
                        fontSize: hp(1.5),
                    }}>💰 {item?.Price_per_night}</Text>
                </View>
            </View>
        </View>
    )
}

export default HotelCard;