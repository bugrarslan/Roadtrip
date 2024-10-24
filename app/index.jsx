import { StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
