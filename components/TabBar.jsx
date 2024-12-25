import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { usePathname } from "expo-router";
import { theme } from "../constants/theme";
import TabBarButton from "./TabBarButton";
import {hp, wp} from "../helpers/common";

const TabBar = ({ state, descriptors, navigation, t}) => {
  const pathname = usePathname();

  const hiddenRoutes = [
    "/budgetSelectModal",
    "/companionSelectModal",
    "/dateSelectModal",
    "/destinationSelectModal",
    "/createTrip",
    "/loading",
  ];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabBarButton
            t={t}
            key={route.name}
            style={styles.tabBarItem}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? theme.colors.primary : "black"}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: wp(4),
    paddingVertical: hp(2),
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    shadowOffset: { width: 0, height: 10 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
});
