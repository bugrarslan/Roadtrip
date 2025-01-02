import {Pressable, StyleSheet, Text, View, Alert, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import {StatusBar} from "expo-status-bar";
import {hp, wp} from "../../../helpers/common";
import StartNewTripCard from "../../../components/StartNewTripCard";
import {useRouter} from "expo-router";
import {fetchTrips} from "../../../services/tripService";
import TripCard from "../../../components/TripCard";
import {theme} from "../../../constants/theme";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import CustomAlert from "../../../components/CustomAlert";

const index = () => {
  const router = useRouter();
  const {t} = useTranslation();
  const user = useSelector((state) => state.auth.user)

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  // custom alert
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({buttons: []});

  const showAlert = (data) => {
    setAlertVisible(true);
    setAlertData(data);
  };

  const closeAlert = () => {
    setAlertVisible(false);
    setAlertData({buttons: []});
  };

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    setLoading(true);
    let res = await fetchTrips(user.id);
    if (res.success) {
      setTrips(res.data);
    } else {
      showAlert({
        type: "error",
        title: t("alert.error"),
        content: t("alert.errorOccurred"),
        buttons: [
          {
            text: t("alert.ok"),
            onPress: () => closeAlert(),
          },
        ],
      })
      return;
    }
    setLoading(false);
  };

  const newTripClicked = () => {
    router.push("/(main)/home/createTrip");
  };

  const handleTripDetails = (tripId) => {
    router.push({
      pathname: "/(main)/home/tripDetails",
      params: {tripId: tripId},
    });
  };

  if (trips.length === 0 && !loading) {
    return (
      <View style={{flex: 1, paddingHorizontal: wp(4), backgroundColor: "white"}}>
        <StartNewTripCard handleNewTrip={newTripClicked} t={t}/>
      </View>
    )
  }

  return (
    <ScreenWrapper backgroundColor={"white"}>
      <StatusBar style="dark"/>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t("home.title")}</Text>
          <Pressable
            onPress={newTripClicked}
            style={{backgroundColor: theme.colors.primary, padding: 10, borderRadius: theme.radius.lg}}>
            <Text style={{fontSize: 15, fontWeight: theme.fonts.medium, color: "white"}}>{t("home.createTrip")}</Text>
          </Pressable>
        </View>

        {/* content */}
        <View style={styles.content}>
          <FlatList
            data={trips}
            contentContainerStyle={{paddingBottom: hp(12)}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{height: hp(2)}}/>}
            renderItem={({item, index}) => (
              <TripCard
                t={t}
                item={item}
                router={router}
                onSubmit={(tripId) => handleTripDetails(tripId)}
                index={index}
              />
            )}
          />
        </View>
      </View>
      <CustomAlert
        visible={isAlertVisible}
        onClose={closeAlert}
        title={alertData?.title}
        message={alertData?.content}
        buttons={alertData?.buttons}
      />
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp(4),
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: wp(7),
    fontWeight: theme.fonts.bold,
  },
  content: {
    flex: 1,
  },
  noPosts: {
    fontSize: hp(2),
    color: theme.colors.text,
    textAlign: "center",
  },
});
