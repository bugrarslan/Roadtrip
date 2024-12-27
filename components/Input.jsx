import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
      {
        props.icon && props.icon
      }
      <TextInput
        style={styles.input}
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputRef && props.inputRef}
        {...props}
      />
      {
        props.showPasswordToggle && props.showPasswordToggle
      }
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: "black",
    height: "100%",
    width: "100%",
  },
  container: {
    flexDirection: 'row',
    height: hp(7.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    borderRadius: theme.radius.xxl,
    gap: 12
  }
})