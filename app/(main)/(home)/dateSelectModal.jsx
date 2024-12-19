import { StyleSheet, Text, View, Platform, Alert } from "react-native";
import React, { useState } from "react";
import BackButton from "../../../components/BackButton";
import { useRouter } from "expo-router";
import CloseButton from "../../../components/CloseButton";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import Button from "../../../components/Button";
import { useTrip } from "../../../contexts/TripContext";

const dateSelectModal = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const ios = Platform.OS === "ios";
  const { tripData, setTripData } = useTrip();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
      setEndDate(null);
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionApply = () => {
    if (!startDate || !endDate) {
      Alert.alert("Error", "Please select start and end dates.", [
        { text: "Ok" },
      ]);
      return;
    }
    const totalNoOfDays = endDate.diff(startDate, "days") + 1;
    setTripData({
      ...tripData,
      dateInfo: {
        startDate: startDate,
        endDate: endDate,
        totalNoOfDays: totalNoOfDays,
      },
    });
    router.back();
  };

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
          <Text style={styles.title}>Which days would you like to go?</Text>
          <CloseButton router={router} />
        </View>
        {/* content */}
        <View style={styles.content}>
          <CalendarPicker
            onDateChange={onDateChange}
            showDayStragglers
            allowRangeSelection
            minDate={new Date()}
            maxRangeDuration={6}
            selectedRangeStyle={{ backgroundColor: theme.colors.PRIMARY }}
            selectedDayTextStyle={{ color: theme.colors.WHITE }}
            textStyle={{ fontFamily: "outfit-medium" }}
          />
          <Button title="Apply" onPress={onDateSelectionApply} />
        </View>
      </View>
    </View>
  );
};

export default dateSelectModal;

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
  content: { flex: 1, marginTop: hp(2), gap: hp(2) },
});