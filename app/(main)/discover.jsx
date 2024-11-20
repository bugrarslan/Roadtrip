import { StyleSheet, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import Button from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { StatusBar } from "expo-status-bar";
import { wp } from "../../helpers/common";

const discover = () => {
  return (
    <ScreenWrapper backgroundColor={"white"}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </ScreenWrapper>
  );
};

export default discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: wp(5),
  }
});
