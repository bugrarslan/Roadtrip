import {StyleSheet, Text, View, Platform} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {hp, wp} from "../../../helpers/common";
import {theme} from "../../../constants/theme";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Header from "../../../components/Header";
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";
import {setTripData, clearTripData} from "../../../contexts/redux/slices/tripSlice"

const destinationSelectModal = () => {
  const router = useRouter();
  const {top} = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const ios = Platform.OS === "ios";
  const {t, i18n} = useTranslation();
  const tripData = useSelector((state) => state.trip.tripData);
  const dispatch = useDispatch();


  return (
    <View
      style={[
        ios ? {paddingTop: wp(5)} : {paddingTop},
        {flex: 1, backgroundColor: theme.colors.WHITE},
      ]}
    >
      <View style={styles.container}>
        <StatusBar style="auto"/>
        {/* header */}
        <Header title={t("destinationSelectModal.headerTitle")} showCloseButton={true}/>

        {/* content */}
        <View style={{flex: 1, backgroundColor: theme.colors.WHITE}}>
          <GooglePlacesAutocomplete
            placeholder={t("destinationSelectModal.placeholder")}
            fetchDetails={true}
            onFail={(error) => console.error(error)}
            onPress={(data, details = null) => {
              dispatch(setTripData({
                ...tripData,
                locationInfo: {
                  name: data.description,
                  coordinates: details?.geometry?.location,
                  photoRef: details?.photos[0]?.photo_reference,
                  url: details?.url,
                },
              }));
              router.back();
            }}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              language: (i18n.language === "tr" ? "tr" : "en"),
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
                fontWeight: theme.fonts.bold,
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
});
