const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate a detailed travel plan for New York, USA, for a 3-day, 2-night family trip with a luxury budget.\n\nProvide the following information:\n\nFlight_Details: Include Flight name, flight_price, and a booking_URL.\n\nHotel_Options: Include a list of hotels with these details for each:\n\nHotel_name\nAddress\nPrice_per_night\nImage_URL\nGeo-coordinates (latitude and longitude)\nRating\nShort_description\nDay_by_Day_Plan: Create a detailed 3-day itinerary with the following for each day:\n\nActivities_or_places_to_visit_for_each_day\nFor every activity or place mentioned, provide Place_Details including:\nPlace_name\nDescription\nImage_URL\nGeo-coordinates (latitude and longitude)\nTicket_pricing\nTravel_time_to_the_location_from_the_hotel\nInclude Travel_time_between_locations and Best_times_to_visit_each_place for each day.\nOutput all the information in valid JSON format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n"},
        {text: "{\"Flight_Details\": [{\"Flight_name\": \"Delta Airlines\", \"flight_price\": \"$1200\", \"booking_URL\": \"https://www.delta.com/\"}], \"Hotel_Options\": [{\"Hotel_name\": \"The Peninsula New York\", \"Address\": \"700 Fifth Ave, New York, NY 10019\", \"Price_per_night\": \"$1500\", \"Image_URL\": \"https://www.thepeninsula.com/en/new-york/images/hotel-gallery/exterior-peninsula-new-york.jpg\", \"Geo-coordinates\": {\"latitude\": \"40.7667\", \"longitude\": \"-73.9833\"}, \"Rating\": \"4.8\", \"Short_description\": \"Luxury hotel located in Midtown Manhattan with stunning city views.\"}, {\"Hotel_name\": \"The Ritz-Carlton New York, Central Park\", \"Address\": \"50 Central Park S, New York, NY 10019\", \"Price_per_night\": \"$1800\", \"Image_URL\": \"https://www.ritzcarlton.com/en/hotels/new-york-central-park/images/hotel-gallery/exterior-ritz-carlton-new-york-central-park.jpg\", \"Geo-coordinates\": {\"latitude\": \"40.7645\", \"longitude\": \"-73.9767\"}, \"Rating\": \"4.7\", \"Short_description\": \"Luxury hotel located near Central Park with elegant rooms and impeccable service.\"}], \"Day_by_Day_Plan\": [{\"Day\": \"Day 1\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Central Park\", \"Description\": \"A large urban park with walking trails, lakes, and attractions like Strawberry Fields and the Bethesda Terrace.\", \"Image_URL\": \"https://www.centralparknyc.org/wp-content/uploads/2021/02/CentralPark_Winter_Landscape.jpg\", \"Geo-coordinates\": {\"latitude\": \"40.7829\", \"longitude\": \"-73.9654\"}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"15 mins\"}, {\"Place_name\": \"The Metropolitan Museum of Art\", \"Description\": \"One of the world's largest and finest art museums.\", \"Image_URL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Metropolitan_Museum_of_Art_exterior.jpg/1280px-Metropolitan_Museum_of_Art_exterior.jpg\", \"Geo-coordinates\": {\"latitude\": \"40.7794\", \"longitude\": \"-73.9632\"}, \"Ticket_pricing\": \"$30\", \"Travel_time_to_the_location_from_the_hotel\": \"20 mins\"}], \"Travel_time_between_locations\": \"10 mins\", \"Best_times_to_visit_each_place\": \"Morning for Central Park and afternoon for the Met Museum\"}, {\"Day\": \"Day 2\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Times Square\", \"Description\": \"A bustling commercial intersection famous for its bright lights and billboards.\", \"Image_URL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Times_Square_at_night.jpg/1920px-Times_Square_at_night.jpg\", \"Geo-coordinates\": {\"latitude\": \"40.7577\", \"longitude\": \"-73.9857\"}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"30 mins\"}, {\"Place_name\": \"Top of the Rock Observation Deck\", \"Description\": \"Offers panoramic views of the city from Rockefeller Center.\", \"Image_URL\": \"https://www.topoftherocknyc.com/sites/default/files/styles/hero_image/public/2023-06/TOR_Hero_Mobile_16_9.jpg\", \"Geo-coordinates\": {\"latitude\": \"40.7589\", \"longitude\": \"-73.9776\"}, \"Ticket_pricing\": \"$40\", \"Travel_time_to_the_location_from_the_hotel\": \"10 mins\"}], \"Travel_time_between_locations\": \"15 mins\", \"Best_times_to_visit_each_place\": \"Late afternoon/early evening for Times Square and sunset for Top of the Rock\"}, {\"Day\": \"Day 3\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Statue of Liberty & Ellis Island\", \"Description\": \"Iconic landmarks representing freedom and immigration.\", \"Image_URL\": \"https://www.nps.gov/stli/index.htm\", \"Geo-coordinates\": {\"latitude\": \"40.6892\", \"longitude\": \"-74.0445\"}, \"Ticket_pricing\": \"$25\", \"Travel_time_to_the_location_from_the_hotel\": \"60 mins by ferry\"}, {\"Place_name\": \"One World Observatory\", \"Description\": \"Observation deck offering stunning views of the city from One World Trade Center.\", \"Image_URL\": \"https://www.oneworldobservatory.com/sites/default/files/styles/og_image/public/2022-08/Owo_exterior_1200x630.jpg\", \"Geo-coordinates\": {\"latitude\": \"40.7130\", \"longitude\": \"-74.0137\"}, \"Ticket_pricing\": \"$40\", \"Travel_time_to_the_location_from_the_hotel\": \"45 mins by taxi\"}], \"Travel_time_between_locations\": \"30 mins by taxi\", \"Best_times_to_visit_each_place\": \"Morning for Statue of Liberty & Ellis Island and afternoon for One World Observatory\"}]}"},
        {text: "\n```"},
      ],
    },
  ],
});
