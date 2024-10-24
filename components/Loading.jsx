import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'

const Loading = ({color=theme.colors.primary, size='large'}) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})