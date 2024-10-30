import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../../components/ScreenWrapper'
import { useRouter } from "expo-router";
import Button from '../../../components/Button';
import { wp } from '../../../helpers/common';
import { theme } from '../../../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../../../components/BackButton';

const Page = () => {
  const router = useRouter();

  const onSubmit = () => {
    router.push("destinationSelectModal");
  };
  return (
    <ScreenWrapper backgroundColor={theme.colors.WHITE}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <BackButton router={router} />
        <Button title="Destination" onPress={onSubmit} />
      </View>
    </ScreenWrapper>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.WHITE,
    paddingHorizontal: wp(5),
    gap: 10,
  }
})