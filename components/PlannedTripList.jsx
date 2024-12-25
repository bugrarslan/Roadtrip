import {FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {theme} from '../constants/theme'
import {Image} from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {getLocationImage, getPhotoRef} from "../services/imageService";
import PlannedTripCard from "./PlannedTripCard";
import {hp} from "../helpers/common";
import Icon from "../assets/icons";

const PlannedTripList = ({details}) => {
  const [expandedDays, setExpandedDays] = useState({});

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day], // Tıklanan günü ters çevir
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏕️ Plan Details</Text>

      {details.map((item, index) => (
        <View key={index} style={{marginVertical: 10}}>
          <TouchableOpacity onPress={() => toggleDay(item?.Day)} style={{
            backgroundColor: theme.colors.containerColor,
            padding: 10,
            borderRadius: theme.radius.lg,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Text style={styles.dayTitle}>{item?.Day}</Text>
            {expandedDays[item?.Day] ? (<Icon name={"arrowDown"} strokeWidth={2.5} color={theme.colors.text}/> ) : (<Icon name={"arrowRight"} strokeWidth={2.5} color={theme.colors.text}/>)}
          </TouchableOpacity>

          {expandedDays[item?.Day] && ( // Eğer gün genişletilmişse
            <View>
              <Text style={styles.infoText}>
                ⚫ Time to travel between locations: {item?.Travel_time_between_locations}
              </Text>
              <Text style={styles.infoText}>
                🟢 Best Time to Visit Each Place: {item?.Best_times_to_visit_each_place}
              </Text>

              {item?.Activities_or_places_to_visit_for_each_day.map((place, idx) => (
                <PlannedTripCard key={idx} place={place}/>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default PlannedTripList

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: theme.colors.WHITE,
  },
  title: {
    fontWeight: theme.fonts.bold,
    fontSize: 20,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: theme.fonts.bold,
  },
  infoText: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: theme.fonts.medium,
  },
});