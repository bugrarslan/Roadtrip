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
import { SelectBudgetList } from "../../../constants/tripOptions";
import { useTrip } from "../../../contexts/TripContext";

const budgetSelectModal = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const ios = Platform.OS === "ios";
  const { tripData, setTripData } = useTrip();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(tripData.budgetInfo);
  }, [])

  useEffect(() => {
    selected && setTripData({ ...tripData, budgetInfo: selected });
  }, [selected]);

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
        <View style={styles.header}>
          <Text style={styles.title}>Bütçen Ne kadar?</Text>
          <CloseButton router={router} />
        </View>
        {/* content */}
        <View style={styles.content}>
          <FlatList
            style={{ width: "100%" }}
            contentContainerStyle={{ gap: 10 }}
            data={SelectBudgetList}
            renderItem={({ item, index }) => (
              <TripButton
                option={item}
                setSelected={setSelected}
                selected={selected}
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
