import {StyleSheet} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";
import TabBar from '../../components/TabBar'
import {useTranslation} from "react-i18next";

const _layout = () => {
  const {t} = useTranslation()

  return (
    <Tabs
      screenOptions={{headerShown: false}}
      tabBar={(props) => <TabBar {...props} t={t}/>}
    >
      <Tabs.Screen name="(home)" options={{title: "Trips"}}/>

      <Tabs.Screen name="discover" options={{title: "Discover"}}/>

      <Tabs.Screen name="profile" options={{title: "Profile"}}/>
    </Tabs>
  );
};

export default _layout

const styles = StyleSheet.create({})