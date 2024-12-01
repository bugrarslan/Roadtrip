import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { wp, hp } from "../../../helpers/common";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { theme } from "../../../constants/theme";
import { useTrip } from "../../../contexts/TripContext";
import { AI_PROMPT } from "../../../constants/data";
import { chatSession } from "../../../services/geminiAiModalService";
import { useRouter } from "expo-router";
import {data} from "../../../constants/data";
import { useAuth } from "../../../contexts/AuthContext";
import { createOrUpdateTrip } from "../../../services/tripService";

const loading = () => {
  const router = useRouter();
  const { tripData, setTripData } = useTrip();
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tripData && generateAiTrip();
  }, []);

  const generateAiTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.name
    )
      .replace("{totalDays}", tripData?.totalNoOfDays)
      .replace("{totalNight}", tripData?.totalNoOfDays - 1)
      .replace("{traveller}", tripData?.companion?.title)
      .replace("{budget}", tripData?.budget?.title)
      .replace("{totalDays}", tripData?.totalNoOfDays)
      .replace("{totalNight}", tripData?.totalNoOfDays - 1);

    console.log(FINAL_PROMPT);
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

    console.log("data", data);

    const res = await createOrUpdateTrip(data);
    setLoading(false);
    if (res.success) {
      router.push("(main)/(home)");
    } else {
      Alert.alert("Trip", res.msg);
    }
  };

  return (
    <ScreenWrapper backgroundColor={theme.colors.WHITE}>
      <View style={styles.container}>
        <View style={styles.loading}>
          <LottieView
            source={require("../../../assets/animations/plane-animation.json")}
            style={{
              width: wp(100),
              aspectRatio: 1,
              padding: wp(4),
            }}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.text}>Kemerlerinizi bağlayın!</Text>
        <Text style={[styles.text, { fontFamily: "outfit-bold" }]}>
          Seyahatiniz hazırlanıyor...
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontFamily: "outfit",
  },
});
