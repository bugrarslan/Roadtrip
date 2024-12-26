import { supabase } from "../lib/supabase";

export const fetchTripDetails = async (tripId) => {
  try {
    const { data, error } = await supabase
      .from("trips")
      .select("*, user: users (id, name, image), tripLikes: tripLikes(*)")
      .eq("id", tripId)
      .order("created_at", { ascending: false })
      .single();

    if (error) {
      console.log("fetch tripDetails error: ", error);
      return { success: false, msg: "Could not fetch trip" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("fetch tripDetails error: ", error);
    return { success: false, msg: "Could not fetch trip" };
  }
};

export const fetchTrips = async (userId) => {
  try {
    if (userId) {
      const { data, error } = await supabase
        .from("trips")
        .select("*, user: users (id, name, image), tripLikes: tripLikes(*)")
        .order("created_at", { ascending: false })
        .eq("userId", userId)

      if (error) {
        console.log("fetch trip error: ", error);
        return { success: false, msg: "Could not fetch trips" };
      }

      return { success: true, data };
    } else {
      const { data, error } = await supabase
        .from("trips")
        .select("*, user: users (id, name, image), tripLikes: tripLikes(*)")
        .order("created_at", { ascending: false })

      if (error) {
        console.log("fetch trip error: ", error);
        return { success: false, msg: "Could not fetch trips" };
      }

      return { success: true, data };
    }
  } catch (error) {
    console.log("fetch trip error: ", error);
    return { success: false, msg: "Could not fetch trips" };
  }
};

export const createOrUpdateTrip = async (trip) => {
  try {
    // //upload Image
    // if (post.file && typeof post.file === "object") {
    //   let isImage = post.file?.type == "image";
    //   let folderName = isImage ? "postImages" : "postVideos";
    //   let fileResult = await uploadFile(folderName, post.file.uri, isImage);
    //   if (fileResult.success) post.file = fileResult.data;
    //   else {
    //     return fileResult;
    //   }
    // }

    const { data, error } = await supabase
      .from("trips")
      .upsert(trip)
      .select()
      .single();

    if (error) {
      console.log("create trip error: ", error);
      return { success: false, msg: "Could not create your trip" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("create trip error: ", error);
    return { success: false, msg: "Could not create your trip" };
  }
};

export const removeTrip = async (tripId) => {
  try {
    const { error } = await supabase.from("trips").delete().eq("id", tripId);

    if (error) {
      console.log("removeTrip error: ", error);
      return { success: false, msg: "Could not remove the trip" };
    }

    return { success: true, data: { tripId } };
  } catch (error) {
    console.log("removeTrip error: ", error);
    return { success: false, msg: "Could not remove the trip" };
  }
};

export const createTripLike = async (tripData) => {
  try {
    const { data, error } = await supabase
      .from("tripLikes")
      .insert(tripData)
      .select()
      .single();

    if (error) {
      console.log("createTripLike error: ", error);
      return { success: false, msg: "Could not like the trip" };
    }

    return { success: true, data };
  } catch (error) {
    console.log("createTripLike error: ", error);
    return { success: false, msg: "Could not like the trip" };
  }
};

export const removePostLike = async (tripId, userId) => {
  try {
    const { error } = await supabase
      .from("tripLikes")
      .delete()
      .eq("tripId", tripId)
      .eq("userId", userId);

    if (error) {
      console.log("removeTripLike error: ", error);
      return { success: false, msg: "Could not remove the trip like" };
    }

    return { success: true };
  } catch (error) {
    console.log("removeTripLike error: ", error);
    return { success: false, msg: "Could not remove the trip like" };
  }
};
