import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { supabase } from "../../../lib/supabase";
import { StatusBar } from "expo-status-bar";
import { hp, wp } from "../../../helpers/common";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import StartNewTripCard from "../../../components/StartNewTripCard";
import { useRouter } from "expo-router";
import { useAuth } from "../../../contexts/AuthContext";
import { getUserData } from "../../../services/userService";
import { fetchTrips } from "../../../services/tripService";
import Loading from "../../../components/Loading";
import TripCard from "../../../components/TripCard";

var limit = 0;
const index = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let tripChannel = supabase
      .channel("trips")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "trips" },
        handleTripEvent
      )
      .subscribe();

    getTrips();

    return () => {
      supabase.removeChannel(tripChannel);
    };
  }, []);

  const handleTripEvent = async (payload) => {
    console.log("trip event: ", payload);
    if (payload.eventType === "INSERT" && payload?.new?.id) {
      let newTrip = { ...payload.new };
      let res = await getUserData(newTrip?.userId);
      newTrip.tripLikes = [];
      // newTrip.comments = [{ count: 0 }];
      newTrip.user = res?.success ? res?.data : {};
      setTrips((prevTrips) => [newTrip, ...prevTrips]);
    }

    if (payload.eventType === "DELETE" && payload?.old?.id) {
      setTrips((prevTrips) => {
        let updatedTrips = prevTrips.filter(
          (trip) => trip.id !== payload.old.id
        );
        return updatedTrips;
      });
    }

    if (payload.eventType === "UPDATE" && payload?.new?.id) {
      setTrips((prevTrips) => {
        let updatedTrips = prevTrips.map((trip) => {
          if (trip.id === payload.new.id) {
            trip.response = payload.new.response;
            trip.locationInfo = payload.new.locationInfo;
            trip.companionInfo = payload.new.companionInfo;
            trip.budgetInfo = payload.new.budgetInfo;
            trip.dateInfo = payload.new.dateInfo;
          }
          return trip;
        });
        return updatedTrips;
      });
    }
  };

  const getTrips = async () => {
    setLoading(true);
    if (!hasMore) {
      setLoading(false);
      return null;
    }
    limit = limit + 10;
    let res = await fetchTrips(limit, user.id);
    setLoading(false);
    if (res.success) {
      if (res.data.length < limit) setHasMore(false);
      setTrips(res.data);
    } else {
      Alert.alert("Home", res.msg);
    }
  };

  const newTripClicked = () => {
    router.push("createTrip");
  };

  return (
    <ScreenWrapper backgroundColor={"white"}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>Trips</Text>
          <Pressable onPress={newTripClicked}>
            <MaterialIcons name="add-circle" size={30} color="black" />
          </Pressable>
        </View>

        {/* content */}
        {trips.length === 0 && loading && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Loading />
          </View>
        )}
        {trips.length === 0 && !loading ? (
          <View style={styles.content}>
            <StartNewTripCard handleNewTrip={newTripClicked} />
          </View>
        ) : (
          <View style={styles.content}>
            <FlatList
              data={trips}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <TripCard item={item} currentUser={user} router={router} index={index}/>
              )}
              contentContainerStyle={{ paddingBottom: hp(12) }}
              style={{ paddingHorizontal: wp(4)}}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  title: {
    fontSize: wp(7),
    fontFamily: "outfit-bold",
  },
  content: {
    //marginHorizontal: wp(4),
    flex: 1,
  },
});
