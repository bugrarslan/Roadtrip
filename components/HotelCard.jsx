import {theme} from "../constants/theme";
import {Image} from "expo-image";
import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {getLocationImage, getPhotoRef} from "../services/imageService";

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
        if (name.length > 21) {
            return (name.substring(0, 21) + "...")
        } else {
            return name
        }
    }
    return (
        <View style={{
            marginRight: 10,
            flex: 1,
            width: 200,
            backgroundColor: theme.colors.GRAY_LIGHT,
            borderRadius: 15,
        }}>
            <Image
                source={getLocationImage(photoRef)}
                style={{
                    width: 200,
                    height: 120,
                    borderRadius: 15,
                }}
                cachePolicy="memory"
            />
            <View style={{
                padding: 5,
            }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 17,

                }}>
                    {trimmedName(item?.Hotel_name)}
                </Text>

                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <Text style={{
                        fontFamily: "outfit",
                    }}>⭐ {item?.Rating}</Text>
                    <Text style={{
                        fontFamily: "outfit",
                    }}>💰 {item?.Price_per_night}</Text>
                </View>
            </View>
        </View>
    )
}

export default HotelCard;