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
        {text: "Generate a detailed travel plan for Amsterdam, for a 7-day, 6-night trip with a A Couple type and a Moderate budget.\n\nProvide the following information:\n\nFlight_Details: Include the following for flight:\nFlight_name\nFlight_price (equivalent in USD)\nBooking_URL\n\nHotel_Options: Include a list of hotels, each with these details:\nHotel_name\nAddress\nPrice_per_night (equivalent in USD)\nGeo-coordinates (latitude and longitude)\nRating\nShort_description\n\nDay_by_Day_Plan: Provide a detailed 7-day itinerary. For each day (Day 1, Day 2, etc.) include:\nDay: Day number (Day 1, Day 2, etc.)\nActivities_or_places_to_visit_for_each_day: List of activities or places to visit on that day\nFor every activity or place, provide Place_Details including:\nPlace_name\nDescription\nGeo-coordinates (latitude and longitude)\nTicket_pricing (equivalent in USD)\nTravel_time_to_the_location_from_the_hotel\n\nOutput all the information in valid JSON format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n"},
        {text: "{\"Flight_Details\": [{\"Flight_name\": \"KLM Royal Dutch Airlines\", \"Flight_price\": \"800\", \"Booking_URL\": \"www.klm.com\"}], \"Hotel_Options\": [{\"Hotel_name\": \"Hotel V Frederiksplein\", \"Address\": \"Frederiksplein 17, 1011 GB Amsterdam, Netherlands\", \"Price_per_night\": \"150\", \"Geo-coordinates\": {\"latitude\": \"52.366667\", \"longitude\": \"4.894444\"}, \"Rating\": \"4.5\", \"Short_description\": \"Modern hotel near city center\"}, {\"Hotel_name\": \"The Hoxton, Amsterdam\", \"Address\": \"Herengracht 264, 1016 Amsterdam, Netherlands\", \"Price_per_night\": \"180\", \"Geo-coordinates\": {\"latitude\": \"52.3687\", \"longitude\": \"4.8967\"}, \"Rating\": \"4.2\", \"Short_description\": \"Stylish hotel in a trendy neighborhood\"}, {\"Hotel_name\": \"Hotel Sebastian's\", \"Address\": \"Grimburgwal 22, 1012 GA Amsterdam, Netherlands\", \"Price_per_night\": \"120\", \"Geo-coordinates\": {\"latitude\": \"52.3730\", \"longitude\": \"4.8968\"}, \"Rating\": \"4.0\", \"Short_description\": \"Boutique hotel in the canal district\"}], \"Day_by_Day_Plan\": [{\"Day\": \"Day 1\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Anne Frank House\", \"Description\": \"A poignant museum dedicated to Anne Frank's life during WWII.\", \"Geo-coordinates\": {\"latitude\": \"52.3726\", \"longitude\": \"4.8869\"}, \"Ticket_pricing\": \"14\", \"Travel_time_to_the_location_from_the_hotel\": \"20 minutes\"}, {\"Place_name\": \"Canal Cruise\", \"Description\": \"Relaxing tour of Amsterdam's iconic canals.\", \"Geo-coordinates\": {\"latitude\": \"52.3676\", \"longitude\": \"4.9041\"}, \"Ticket_pricing\": \"25\", \"Travel_time_to_the_location_from_the_hotel\": \"15 minutes\"}]}, {\"Day\": \"Day 2\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Rijksmuseum\", \"Description\": \"World-renowned museum showcasing Dutch Masters.\", \"Geo-coordinates\": {\"latitude\": \"52.3662\", \"longitude\": \"4.8895\"}, \"Ticket_pricing\": \"22\", \"Travel_time_to_the_location_from_the_hotel\": \"30 minutes\"}, {\"Place_name\": \"Vondelpark\", \"Description\": \"Large public park perfect for a relaxing stroll.\", \"Geo-coordinates\": {\"latitude\": \"52.3594\", \"longitude\": \"4.8726\"}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"25 minutes\"}]}, {\"Day\": \"Day 3\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Heineken Experience\", \"Description\": \"Interactive tour of the Heineken Brewery.\", \"Geo-coordinates\": {\"latitude\": \"52.3670\", \"longitude\": \"4.8958\"}, \"Ticket_pricing\": \"28\", \"Travel_time_to_the_location_from_the_hotel\": \"15 minutes\"}, {\"Place_name\": \"Jordaan District\", \"Description\": \"Charming neighborhood with canals, shops and restaurants.\", \"Geo-coordinates\": {\"latitude\": \"52.3700\", \"longitude\": \"4.8880\"}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"20 minutes\"}]}, {\"Day\": \"Day 4\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Albert Cuyp Market\", \"Description\": \"Bustling street market with local products and street food.\", \"Geo-coordinates\": {\"latitude\": \"52.3527\", \"longitude\": \"4.9029\"}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"30 minutes\"}, {\"Place_name\": \"Foodhallen\", \"Description\": \"Indoor food market with diverse cuisines.\", \"Geo-coordinates\": {\"latitude\": \"52.3609\", \"longitude\": \"4.8890\"}, \"Ticket_pricing\": \"Varies\", \"Travel_time_to_the_location_from_the_hotel\": \"25 minutes\"}]}, {\"Day\": \"Day 5\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Van Gogh Museum\", \"Description\": \"Museum dedicated to the works of Vincent van Gogh.\", \"Geo-coordinates\": {\"latitude\": \"52.3627\", \"longitude\": \"4.8849\"}, \"Ticket_pricing\": \"20\", \"Travel_time_to_the_location_from_the_hotel\": \"35 minutes\"}, {\"Place_name\": \"Museumplein\", \"Description\": \"Square with museums and cafes.\", \"Geo-coordinates\": {\"latitude\": \"52.3600\", \"longitude\": \"4.8828\"}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"30 minutes\"}]}, {\"Day\": \"Day 6\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Day trip to Zaanse Schans\", \"Description\": \"Visit traditional windmills and learn about Dutch history.\", \"Geo-coordinates\": {\"latitude\": \"52.3908\", \"longitude\": \"4.8891\"}, \"Ticket_pricing\": \"Round-trip train fare approx 20\", \"Travel_time_to_the_location_from_the_hotel\": \"1 hour by train\"}, {\"Place_name\": \"Relax by the canals\", \"Description\": \"Enjoy the atmosphere of Amsterdam's canals.\", \"Geo-coordinates\": {\"latitude\": \"52.3676\", \"longitude\": \"4.9041\"}, \"Ticket_pricing\": \"Free\", \"Travel_time_to_the_location_from_the_hotel\": \"10 minutes\"}]}, {\"Day\": \"Day 7\", \"Activities_or_places_to_visit_for_each_day\": [{\"Place_name\": \"Departure\", \"Description\": \"Depart from Amsterdam.\", \"Geo-coordinates\": null, \"Ticket_pricing\": null, \"Travel_time_to_the_location_from_the_hotel\": null}]}]}"},
        {text: "\n```"},
      ],
    },
  ],
});
