import {Pressable, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import {theme} from '../constants/theme'
import {useTrip} from "../contexts/TripContext";

const BackButton = ({size = 26, router, isResetContext, buttonStyle}) => {
  const {setTripData} = useTrip();

  const handleBack = () => {
    if(isResetContext) {
      setTripData([]);
    }
    router.back();
  }

  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={handleBack}>
      <Icon name="arrowLeft" size={size} strokeWidth={2.5} color={theme.colors.text}/>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.07)',
  }
})