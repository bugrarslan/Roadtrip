import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { theme } from "../constants/theme";
import { Image } from "expo-image";
import { hp, wp } from "../helpers/common";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TripCard = ({ item, currentUser, router }) => {
  const handleTripDetails = () => {
    // Detay sayfasına yönlendir
    router.push({
      pathname: "tripDetails",
      params: { tripId: item.id }
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handleTripDetails}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item?.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
        }}
        contentFit="cover"
        contentPosition="center"
        cachePolicy="memory-disk"
      />
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item?.locationInfo?.name}
        </Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MaterialIcons name="calendar-today" size={16} color={theme.colors.GRAY} />
            <Text style={styles.metaText}>
              {item?.dateInfo?.startDate} - {item?.dateInfo?.endDate}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <MaterialIcons name="attach-money" size={16} color={theme.colors.GRAY} />
            <Text style={styles.metaText}>
              {item?.budgetInfo?.title}
            </Text>
          </View>
        </View>
        
        <View style={styles.companionContainer}>
          <MaterialIcons name="people" size={16} color={theme.colors.GRAY} />
          <Text style={styles.companionText}>
            {item?.companionInfo?.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: hp(1),
    marginHorizontal: wp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'column',
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: hp(25)
  },
  image: {
    width: '100%',
    height: hp(25),
    backgroundColor: theme.colors.darkLight,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  detailsContainer: {
    padding: wp(4),
  },
  title: {
    fontSize: wp(5),
    fontFamily: 'outfit-bold',
    marginBottom: hp(1),
    color: theme.colors.BLACK
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(1)
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: wp(2)
  },
  metaText: {
    marginLeft: wp(1),
    fontSize: wp(3.5),
    color: theme.colors.GRAY
  },
  companionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1)
  },
  companionText: {
    marginLeft: wp(1),
    fontSize: wp(3.5),
    color: theme.colors.GRAY
  }
});