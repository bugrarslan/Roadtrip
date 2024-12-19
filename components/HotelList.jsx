import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { theme } from "../constants/theme";

const HotelList = ({ hotels }) => {
  

  const trimmedName = (name) => {
    if (name.length > 21) {
      return( name.substring(0, 21) + "...")
    } else {
      return name
    }
  }

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
                width: 200,
                backgroundColor: theme.colors.GRAY_LIGHT,
                borderRadius: 15,
            }}>
                <Image
                    source={require('../assets/images/icon.png')}
                    style={{
                        width: 200,
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
                        {trimmedName(item?.Hotel_name)}
                    </Text>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{
                            fontFamily: "outfit",
                        }}>⭐ {item?.Rating}</Text>
                        <Text style={{
                            fontFamily: "outfit",
                        }}>💰 {item?.Price_per_night}</Text>
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
