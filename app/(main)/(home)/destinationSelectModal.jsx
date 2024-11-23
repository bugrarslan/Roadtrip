import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import BackButton from "../../../components/BackButton";
import { useRouter } from "expo-router";
import CloseButton from "../../../components/CloseButton";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import Button from "../../../components/Button";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { mapsPlacesApiKey } from "../../../constants/index";
import { useTrip } from "../../../contexts/TripContext";

const destinationSelectModal = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const ios = Platform.OS === "ios";
  const { tripData, setTripData } = useTrip();

  return (
    <View
      style={[
        ios ? { paddingTop: wp(5) } : { paddingTop },
        { flex: 1, backgroundColor: theme.colors.WHITE },
      ]}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>Nereye Gitmek istersin?</Text>
          <CloseButton router={router} />
        </View>

        {/* content */}
        <View style={{ flex: 1, backgroundColor: theme.colors.WHITE }}>
          <GooglePlacesAutocomplete
            placeholder="Ara"
            fetchDetails={true}
            onFail={(error) => console.error(error)}
            onPress={(data, details = null) => {
              setTripData({
                ...tripData,
                locationInfo: {
                  name: data.description,
                  coordinates: details?.geometry?.location,
                  photoRef: details?.photos[0]?.photo_reference,
                  url: details?.url,
                },
              });
              router.back();
            }}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              language: "en",
            }}
            styles={{
              textInputContainer: {
                borderWidth: 2,
                borderRadius: theme.radius.xl,
                borderCurve: "continuous",
                borderColor: "#000",
                justifyContent: "center",
              },
              textInput: {
                fontFamily: "outfit",
                fontSize: hp(2.5),
                color: "black",
                borderRadius: theme.radius.xl,
                backgroundColor: theme.colors.WHITE,
                height: hp(8),
              },
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default destinationSelectModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
    gap: 10,
    backgroundColor: theme.colors.WHITE,
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
});
