import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { color } from "@rneui/themed/dist/config";
import { theme } from "../constants/theme";

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    home: (props) => (
      <MaterialIcons name="flight" size={26} color="black" {...props} />
    ),
    discover: (props) => (
      <MaterialIcons name="search" size={26} color="black" {...props} />
    ),
    profile: (props) => (
      <MaterialIcons name="person" size={26} color="black" {...props} />
    ),
  };

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
          <TouchableOpacity
            key={route.name}
            style={styles.tabBarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({
              color: isFocused ? theme.colors.primary : "black",
            })}
            {
                isFocused ? null : <Text style={{ color: "black", fontFamily: "outfit" }}>
                {label}
              </Text>
            }
            {/* <Text style={{ color: isFocused ? "white" : "black", fontFamily: "outfit" }}>
              {label}
            </Text> */}
          </TouchableOpacity>
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
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowOffset: { width: 0, height: 10 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // elevation: 5
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
