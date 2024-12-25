import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import { useRouter } from "expo-router";
import CloseButton from "../../../components/CloseButton";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import Button from "../../../components/Button";
import TripButton from "../../../components/TripButton";
import Header from "../../../components/Header";
import {useTranslation} from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setTripData, clearTripData } from "../../../contexts/redux/slices/tripSlice"

const companionSelectModal = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const ios = Platform.OS === "ios";
  const { t } = useTranslation();
  const tripData = useSelector((state) => state.trip.tripData);
  const dispatch = useDispatch();

  const SelectTravellerList = [
    {
      id: 1,
      title: t("selectTravellerList.1.title"),
      description: t("selectTravellerList.1.description"),
      icon: "🛩️",
      people: t("selectTravellerList.1.people"),
    },
    {
      id: 2,
      title: t("selectTravellerList.2.title"),
      description: t("selectTravellerList.2.description"),
      icon: "🥂",
      people: t("selectTravellerList.2.people"),
    },
    {
      id: 3,
      title: t("selectTravellerList.3.title"),
      description: t("selectTravellerList.3.description"),
      icon: "🏠",
      people: t("selectTravellerList.3.people"),
    },
    {
      id: 4,
      title: t("selectTravellerList.4.title"),
      description: t("selectTravellerList.4.description"),
      icon: "⛵",
      people: t("selectTravellerList.4.people"),
    },
  ]

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(tripData.companionInfo);
  }, [])

  const onItemSelected = (option) => {
    setSelected(option);
    dispatch(setTripData({ ...tripData, companionInfo: option }));
    setTimeout(() => {
      router.back();
    }, 500);
  }

  return (
    <View
      style={[
        ios ? { paddingTop: wp(5) } : { paddingTop },
        { backgroundColor: theme.colors.WHITE, flex: 1 },
      ]}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* header */}
        <Header title={t("companionSelectModal.headerTitle")} showCloseButton={true}/>
        {/* content */}
        <View style={styles.content}>
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ gap: 10 }}
            data={SelectTravellerList}
            renderItem={({ item, index }) => (
              <TripButton
                option={item}
                selected={selected}
                onSelect={onItemSelected}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default companionSelectModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
    paddingHorizontal: wp(5),
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: wp(5),
    fontFamily: "outfit-bold",
    textAlign: "center",
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
