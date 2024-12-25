import {Alert, StyleSheet, Text, View, BackHandler} from "react-native";
import React, {useEffect, useState} from "react";
import LottieView from "lottie-react-native";
import {wp, hp} from "../../../helpers/common";
import ScreenWrapper from "../../../components/ScreenWrapper";
import {theme} from "../../../constants/theme";
// import {useTrip} from "../../../contexts/TripContext";
// import {useAuth} from "../../../contexts/AuthContext";
import {AI_PROMPT} from "../../../constants/index";
import {chatSession} from "../../../services/geminiAiModalService";
import {useRouter} from "expo-router";
import {createOrUpdateTrip} from "../../../services/tripService";
import {useTranslation} from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { setTripData, clearTripData } from "../../../contexts/redux/slices/tripSlice"
import { setAuth, clearAuth } from "../../../contexts/redux/slices/authSlice"

const loading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();
  const tripData = useSelector((state) => state.trip.tripData);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      Alert.alert(t("loading.backAlertTitle"), t("loading.backAlertContent"), [
        { text: t("loading.backAlertButton"), onPress: () => {} },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    tripData && generateAiTrip();

    return () => backHandler.remove();

  }, []);

  const generateAiTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", tripData?.locationInfo?.name)
      .replace("{totalDays}", tripData?.dateInfo?.totalNoOfDays)
      .replace("{totalNight}", tripData?.dateInfo?.totalNoOfDays - 1)
      .replace("{traveller}", tripData?.companionInfo?.title)
      .replace("{budget}", tripData?.budgetInfo?.title)
      .replace("{totalDays}", tripData?.dateInfo?.totalNoOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    const tripResponse = JSON.parse(result.response.text());

    let data = {
      response: tripResponse,
      locationInfo: tripData?.locationInfo,
      companionInfo: tripData?.companionInfo,
      budgetInfo: tripData?.budgetInfo,
      dateInfo: tripData?.dateInfo,
      userId: user?.id,
    };

    const res = await createOrUpdateTrip(data);
    setLoading(false);
    if (res.success) {
      dispatch(clearTripData());
      router.replace("/(main)/(home)");
    } else {
      Alert.alert(t("loading.responseAlertTitle"), res.msg, [{text: t("loading.responseAlertButton"), style: "cancel", onPress: () => router.replace("/(main)/(home)")}]);
    }
  };

  return (
    <ScreenWrapper backgroundColor={theme.colors.WHITE}>
      {loading && (
        <View style={styles.container}>
          <View style={styles.loading}>
            <LottieView
              source={require("../../../assets/animations/plane-animation.json")}
              style={{
                width: "100%",
                aspectRatio: 1,
                padding: wp(4),
              }}
              autoPlay
              loop
            />
          </View>
          <Text style={styles.text}>{t("loading.text1")}</Text>
          <Text style={[styles.text, {fontWeight: theme.fonts.bold}]}>
            {t("loading.text2")}
          </Text>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp(4),
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: hp(4),
    color: "#000",
    textAlign: "center",
    overflow: "hidden",
    fontWeight: theme.fonts.medium,
  },
});
