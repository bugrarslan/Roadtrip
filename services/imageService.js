import * as FileSystem from "expo-file-system";
//import { decode } from "base64-arraybuffer";
import {supabase} from "../lib/supabase";

export const getUserImageSrc = (imagePath) => {
    if (imagePath) {
        return getSupabaseFileUrl(imagePath);
    } else {
        return require("../assets/images/icon.png");
    }
};

export const getSupabaseFileUrl = (filePath) => {
    if (filePath) {
        return {
            uri: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`,
        };
    }
};

export const downloadFile = async (url) => {
    try {
        const {uri} = await FileSystem.downloadAsync(url, getLocalFilePath(url));
        return uri;
    } catch (error) {
        return null;
    }
};

export const getLocalFilePath = (filePath) => {
    let fileName = filePath.split("/").pop();
    return `${FileSystem.documentDirectory}${fileName}`;
};

export const uploadFile = async (folderName, fileUri, isImage = true) => {
    try {
        let fileName = getFilePath(folderName, isImage);
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        let imageData = decode(fileBase64); // INFO: array buffer
        const {data, error} = await supabase.storage
            .from("uploads")
            .upload(fileName, imageData, {
                cacheControl: "3600",
                upsert: false,
                contentType: "image/*",
            });

        if (error) {
            console.log("file upload error: ", error);
            return {success: false, msg: "Could not upload media"};
        }

        // console.log("data: ", data);

        return {success: true, data: data.path};
    } catch (error) {
        console.log("file upload error: ", error);
        return {success: false, msg: "Could not upload media"};
    }
};

export const getFilePath = (folderName) => {
    return `/${folderName}/${new Date().getTime()}.png`;
    //INFO: profiles/1234567890.png, images/1234567890.png
};

export const getPhotoRef = async (placeName) => {
    const response = await fetch("https://maps.googleapis.com/maps/api/place/textsearch/json"+
      "?query="+placeName+
      "&key="+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY)
    const result = await response.json()
    return result.results[0].photos[0].photo_reference
};

export const getLocationImage = (imageRef) => {
    return {
        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
    }
}