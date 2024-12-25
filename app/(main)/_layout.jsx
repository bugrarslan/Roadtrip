import {StyleSheet} from 'react-native'
import React from 'react'
import {Tabs, usePathname} from "expo-router";
import TabBar from '../../components/TabBar'

const _layout = () => {
  const pathname = usePathname();

  // TabBar'ın görünmemesi gereken sayfaları tanımla
  const routesToHideTabBar = [
    "/(main)/(home)/budgetSelectModal",
    "/(main)/(home)/companionSelectModal",
    "/(main)/(home)/dateSelectModal",
    "/(main)/(home)/destinationSelectModal",
    "/(main)/(home)/createTrip",
    "/(main)/(home)/loading",
  ];

  // Geçerli rota bu listede mi?
  const isTabBarVisible = !routesToHideTabBar.includes(pathname);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: isTabBarVisible
          ? {}
          : {display: "none"}, // TabBar'ı gizle
      }}
      tabBar={(props) => (isTabBarVisible ? <TabBar {...props} /> : null)} // TabBar'ı tamamen kaldır
    >
      {/* Ana sayfa */}
      <Tabs.Screen name="(home)" options={{title: "Trips"}}/>

      {/* Discover */}
      <Tabs.Screen name="discover" options={{title: "Discover"}}/>

      {/* Profile */}
      <Tabs.Screen name="profile" options={{title: "Profile"}}/>
    </Tabs>
  );
};

export default _layout

const styles = StyleSheet.create({})