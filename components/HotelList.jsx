import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { theme } from "../constants/theme";

const HotelList = ({ hotels }) => {
  console.log(hotels);
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
        renderItem={({ item, index }) => (
            <View style={{
                marginRight: 10,
                flex: 1,
                width: 180,
                backgroundColor: theme.colors.GRAY_LIGHT,
                borderRadius: 15,
            }}>
                <Image
                    source={require('../assets/images/icon.png')}
                    style={{
                        width: 180,
                        height: 120,
                        borderRadius: 15,
                    }}
                />
                <View style={{
                    padding: 5,
                }}>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 17,
                        
                    }}>
                        {item?.hotelName}
                    </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{
                            fontFamily: "outfit",
                        }}>⭐ {item?.rating}</Text>
                        <Text style={{
                            fontFamily: "outfit",
                        }}>💰 {item?.price}</Text>
                    </View>
                </View>
            </View>
        )}
      />
    </View>
  );
};

export default HotelList;

const styles = StyleSheet.create({});
