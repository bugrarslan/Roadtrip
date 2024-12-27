import {StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import {hp} from "../helpers/common";
import Button from "./Button";
import {theme} from "../constants/theme";
import Icon from "../assets/icons";

const StartNewTripCard = ({handleNewTrip, t}) => {

  return (
    <View style={styles.container}>
      <View style={{alignSelf: "center"}}>
        <Icon name={"location"} size={hp(5)}/>
      </View>
      <Text
        style={{
          fontSize: hp(3),
          fontWeight: theme.fonts.bold,
          textAlign: "center",
          color: theme.colors.textLight,
        }}
      >
        {t("startNewTripCard.title")}
      </Text>
      <Text
        style={{
          fontSize: hp(2),
          fontWeight: theme.fonts.medium,
          textAlign: "center",
          color: theme.colors.textLight,
        }}
      >
        {t("startNewTripCard.description")}
      </Text>
      <Button
        onPress={handleNewTrip}
        title={t("startNewTripCard.button")}
      />
    </View>
  );
};

export default StartNewTripCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
});
