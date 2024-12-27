import {Alert, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Button from "../../../components/Button";
import {supabase} from "../../../lib/supabase";
import {StatusBar} from "expo-status-bar";
import {wp, hp} from "../../../helpers/common";
import {useTranslation} from "react-i18next";
import Header from "../../../components/Header";
import Icon from "../../../assets/icons";
import {theme} from "../../../constants/theme";
import {setAuth, clearAuth} from "../../../contexts/redux/slices/authSlice";
import {useSelector} from "react-redux";
import {useRouter} from "expo-router";
import Avatar from "../../../components/Avatar";

const index = () => {
  const {t} = useTranslation();
  const user = useSelector((state) => state.auth.user)
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        onPress: () => console.log("cancelled"),
        style: "cancel",
      },
      {
        text: "Sıgn Out",
        onPress: () => signOut(),
        style: "destructive",
      },
    ]);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Sign Out", "An error occurred while signing out");
      return;
    }
  };

  return (
    <ScreenWrapper backgroundColor={"white"}>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: wp(4),
      }}>
        <StatusBar style="dark"/>
        <View>
          <Header mb={30} title={t("profile.header")}/>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name={"logout"} color={theme.colors.rose}/>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={{gap: 15}}>
            <View style={styles.avatarContainer}>
              <Avatar
                size={hp(12)}
                uri={user?.image}
                rounded={theme.radius.xxl * 1.4}
              />
              <Pressable
                style={styles.editIcon}
                onPress={() => router.push("/editProfile")}
              >
                <Icon name="edit" size={20} strokeWidth={2.5}/>
              </Pressable>
            </View>

            {/* username and address */}
            <View style={{alignItems: "center", gap: 4}}>
              <Text style={styles.userName}>{user && user.name}</Text>
              <Text style={styles.infoText}>
                {/* {user && user.address} */}
                {user && user.address}
              </Text>
            </View>

            {/* email and bio */}
            <View style={{gap: 10}}>
              <View style={styles.info}>
                <Icon name="mail" size={20} color={theme.colors.textLight}/>
                <Text style={styles.infoText}>{user && user.email}</Text>
              </View>

              {user && user.phoneNumber && (
                <View style={styles.info}>
                  <Icon name="call" size={20} color={theme.colors.textLight}/>
                  <Text style={styles.infoText}>{user && user.phoneNumber}</Text>
                </View>
              )}

              {user && user.bio && (
                <View style={styles.info}>
                  <Text style={styles.infoText}>{user && user.bio}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "#fee2e2",
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20,
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  avatarContainer: {
    alignSelf: "center",
    width: hp(12),
    height: hp(12),
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    backgroundColor: "white",
    padding: 7,
    borderRadius: 50,
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: "500",
    color: theme.colors.textDark,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: theme.colors.textLight,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    color: theme.colors.text,
    textAlign: "center",
  },
});
