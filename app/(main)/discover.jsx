import { StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Button from '../../components/Button'
import { supabase } from '../../lib/supabase'
import { StatusBar } from 'expo-status-bar'

const Page = () => {
  return (
    <ScreenWrapper backgroundColor={"white"}>
      <StatusBar style="dark" />
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </ScreenWrapper>
  )
}

export default Page

const styles = StyleSheet.create({})