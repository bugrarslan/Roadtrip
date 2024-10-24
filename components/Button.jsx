import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import Loading from './Loading'

const Button = ({
    buttonStyle,
    textStyle,
    title='',
    onPress=()=>{},
    loading=false,
    hasShadow=true
}) => {

    const shadowStyle = {
        shadowColor: theme.colors.dark,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    }

    if(loading){
        return (
            <View style={[buttonStyle, styles.button, {backgroundColor: 'white'}]}>
                <Loading />
            </View>
        )
    }

  return (
    <Pressable onPress={onPress} style={[buttonStyle, styles.button, hasShadow && shadowStyle]}>
        <Text style={[textStyle, styles.text]}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.PRIMARY,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl,
    },
    text: {
        fontSize: hp(2.5),
        color: 'white',
        fontFamily: 'outfit-bold'
    }
})