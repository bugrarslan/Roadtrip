import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'

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

      {Object.entries(details).map(([Day, details]) => (
        <View>
            <Text>{Day.charAt(0).toUpperCase()+Day.slice(1)}</Text>
            {details?.Activities_or_places_to_visit_for_each_day?.map((place, index) => (
                <View>
                    <Text>{place}</Text>
                </View>
            ))}
        </View>
      ))}
    </View>
  )
}

export default PlannedTrip

const styles = StyleSheet.create({})