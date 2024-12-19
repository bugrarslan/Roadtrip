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

      {Object.entries(details).map(([day, details]) => (
        <View>
            <Text>{day.charAt(0).toUpperCase()+day.slice(1)}</Text>
            {details?.plan?.map((place, index) => (
                <View>
                    <Text>{place?.placeName}</Text>
                </View>
            ))}
        </View>
      ))}
    </View>
  )
}

export default PlannedTrip

const styles = StyleSheet.create({})