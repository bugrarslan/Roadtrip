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

const Page = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;
  const ios = Platform.OS === "ios";

  const onSubmit = () => {
    router.push("budgetSelectModal");
  };
  return (
    <View
      style={[
        ios ? {paddingTop: wp(5)} :{ paddingTop },
        { backgroundColor: theme.colors.WHITE, flex: 1 },
      ]}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <Text style={styles.title}>Hangi Günler Gitmek istersin?</Text>
          <CloseButton router={router} />
        </View>
        <View>
          
        </View>
      </View>
    </View>
  );
};

export default Page;

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
});
