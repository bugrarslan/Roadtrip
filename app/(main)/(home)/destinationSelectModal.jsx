import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import BackButton from "../../../components/BackButton";
import { useRouter } from "expo-router";
import CloseButton from "../../../components/CloseButton";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { wp } from "../../../helpers/common";
import { theme } from "../../../constants/theme";
import Button from "../../../components/Button";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { mapsPlacesApiKey } from "../../../constants/index";


const Page = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const ios = Platform.OS === "ios";

  const onSubmit = () => {
    router.push("companionSelectModal");
  };
  return (
    <View
      style={[
        ios ? { paddingTop: wp(5) } : { paddingTop },
        {  flex: 1 },
      ]}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.title}>Nereye Gitmek istersin?</Text>
          <CloseButton router={router} />
        </View>

        <View style={{flex: 1}}>
          {/* <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              language: "tr",
            }}
          /> */}
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
