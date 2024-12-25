import {Pressable, StyleSheet} from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import {theme} from '../constants/theme'
import { useDispatch } from "react-redux";
import { clearTripData } from "../contexts/redux/slices/tripSlice"

const BackButton = ({size = 26, router, isResetContext, buttonStyle}) => {
  const dispatch = useDispatch();

  const handleBack = () => {
    if(isResetContext) {
      dispatch(clearTripData());
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