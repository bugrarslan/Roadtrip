const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
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
        {text: "Generate a detailed travel plan for New York USA for a 3-day, 2-night family trip with a luxury budget. Include the following:\n\nFlight_Details: Flight name, flight_price, and a booking_URL.\nHotel_Options: A list of hotels with the following details for each hotel:\nHotel_name\nAddress\nPrice_per_night\nImage_URL\nGeo-coordinates (latitude and longitude)\nRating\nShort_description\nPlaces_to_Visit_Nearby: A list of places with the following details for each place:\nPlace_name\nDescription\nImage_URL\nGeo-coordinates (latitude and longitude)\nTicket_pricing\nTravel_time_to_the_location_from_the_hotel\nDay_by_Day_Plan: A detailed itinerary for 3 days, including:\nActivities_or_places_to_visit_for_each_day\nTravel_time_between_locations\nBest_times_to_visit_each_place\nOutput all the information in JSON format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n"},
        {text: "{\"Flight_Details\": [{\"Flight_name\": \"Delta Airlines\", \"flight_price\": 1200, \"booking_URL\": \"www.delta.com\"}], \"Hotel_Options\": [{\"Hotel_name\": \"The Peninsula New York\", \"Address\": \"700 Fifth Ave, New York, NY 10019\", \"Price_per_night\": 1500, \"Image_URL\": \"https://www.thepeninsula.com/en/new-york/images/hotel-gallery/hotel-exterior-day.jpg\", \"Geo-coordinates\": {\"latitude\": 40.767272, \"longitude\": -73.971452}, \"Rating\": 4.8, \"Short_description\": \"Luxury hotel located in Midtown Manhattan with stunning city views and exceptional amenities.\"}, {\"Hotel_name\": \"The St. Regis New York\", \"Address\": \"2 E 55th St, New York, NY 10022\", \"Price_per_night\": 1200, \"Image_URL\": \"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/a8/98/62/the-st-regis-new.jpg?w=1200&h=-1&s=1\", \"Geo-coordinates\": {\"latitude\": 40.758021, \"longitude\": -73.967889}, \"Rating\": 4.7, \"Short_description\": \"Historic luxury hotel known for its elegant rooms and impeccable service.\"}], \"Places_to_Visit_Nearby\": [{\"Place_name\": \"Central Park\", \"Description\": \"Large urban park with walking trails, museums, and iconic views.\", \"Image_URL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Central_Park_Sunrise_1.jpg/1280px-Central_Park_Sunrise_1.jpg\", \"Geo-coordinates\": {\"latitude\": 40.7829, \"longitude\": -73.9654}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"15-20 minutes\"}, {\"Place_name\": \"Metropolitan Museum of Art\", \"Description\": \"World-renowned art museum housing a vast collection from around the globe.\", \"Image_URL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Metropolitan_Museum_of_Art_exterior_view.jpg/1280px-Metropolitan_Museum_of_Art_exterior_view.jpg\", \"Geo-coordinates\": {\"latitude\": 40.7794, \"longitude\": -73.9632}, \"Ticket_pricing\": \"$30\", \"Travel_time_to_the_location_from_the_hotel\": \"10-15 minutes\"}, {\"Place_name\": \"Times Square\", \"Description\": \"Vibrant commercial intersection known for its dazzling lights and billboards.\", \"Image_URL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Times_Square_NYC.jpg/1280px-Times_Square_NYC.jpg\", \"Geo-coordinates\": {\"latitude\": 40.7589, \"longitude\": -73.9851}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"10-15 minutes\"}], \"Day_by_Day_Plan\": [{\"Day\": \"Day 1\", \"Activities_or_places_to_visit_for_each_day\": [\"Arrive at your hotel and check in.\", \"Afternoon tea at The Peninsula Hotel.\", \"Evening stroll through Central Park, followed by dinner at The Loeb Boathouse.\"], \"Travel_time_between_locations\": \"15-20 minutes between hotel and Central Park.\", \"Best_times_to_visit_each_place\": {\"Central Park\": \"Late afternoon for a pleasant stroll.\", \"The Loeb Boathouse\": \"Evening for dinner with a view.\"}}, {\"Day\": \"Day 2\", \"Activities_or_places_to_visit_for_each_day\": [\"Morning visit to the Metropolitan Museum of Art.\", \"Lunch at The Met’s cafeteria.\", \"Afternoon exploring Times Square.\", \"Dinner at a Broadway-area restaurant.\", \"Optional: Attend a Broadway show.\"], \"Travel_time_between_locations\": \"10-15 minutes between the hotel, The Met and Times Square.\", \"Best_times_to_visit_each_place\": {\"Metropolitan Museum of Art\": \"Morning to avoid crowds.\", \"Times Square\": \"Afternoon to experience the energy.\", \"Broadway Show\": \"Evening.\"}}, {\"Day\": \"Day 3\", \"Activities_or_places_to_visit_for_each_day\": [\"Morning shopping on Fifth Avenue.\", \"Brunch at a stylish café.\", \"Afternoon exploring a neighborhood of your choice (e.g., Greenwich Village, SoHo).\", \"Depart from New York.\"], \"Travel_time_between_locations\": \"Flexible, depending on your chosen neighborhood.\", \"Best_times_to_visit_each_place\": {\"Fifth Avenue\": \"Morning for shopping.\", \"Greenwich Village or SoHo\": \"Afternoon for exploring.\"}}]}"},
        {text: "\n```"},
      ],
    },
  ],
});
