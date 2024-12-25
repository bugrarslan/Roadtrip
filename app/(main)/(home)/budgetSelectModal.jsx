import { StyleSheet, Text, View, Platform, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import { useRouter } from "expo-router";
import CloseButton from "../../../components/CloseButton";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import TripButton from "../../../components/TripButton";
import { SelectBudgetList } from "../../../constants/tripOptions";
import { useTrip } from "../../../contexts/TripContext";
import Header from "../../../components/Header";
import {useTranslation} from "react-i18next";

const budgetSelectModal = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const ios = Platform.OS === "ios";
  const { tripData, setTripData } = useTrip();
  const { t } = useTranslation();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(tripData.budgetInfo);
  }, [])

  const onItemSelected = (option) => {
    setSelected(option);
    setTripData({ ...tripData, budgetInfo: option });
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
        <Header title={t("budgetSelectModal.headerTitle")} showCloseButton={true}/>
        {/* content */}
        <View style={styles.content}>
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ gap: 10 }}
            data={SelectBudgetList}
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

export default budgetSelectModal;

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
