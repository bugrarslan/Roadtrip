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
        {text: "Generate a detailed travel plan for London, UK for a 3-day, 2-night family trip with a luxury budget. Include the following:\n\nFlight Details: Flight name, flight price, and a booking URL.\nHotel Options: A list of hotels with the following details for each hotel:\nHotel name\nAddress\nPrice per night\nImage URL\nGeo-coordinates (latitude and longitude)\nRating\nShort description\nPlaces to Visit Nearby: A list of places with the following details for each place:\nPlace name\nDescription\nImage URL\nGeo-coordinates (latitude and longitude)\nTicket pricing\nTravel time to the location from the hotel\nDay-by-Day Plan: A detailed itinerary for 3 days, including:\nActivities or places to visit for each day\nTravel time between locations\nBest times to visit each place\nOutput all the information in JSON format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n"},
        {text: "{\"Flight Details\": [{\"Flight Name\": \"British Airways\", \"Flight Price\": \"£1200\", \"Booking URL\": \"https://www.britishairways.com/travel\"}], \"Hotel Options\": [{\"Hotel Name\": \"The Savoy\", \"Address\": \"Strand, London WC2R 0EU, UK\", \"Price per night\": \"£1000\", \"Image URL\": \"https://www.thesavoylondon.com/images/default-source/home-page/hero-desktop.jpg?sfvrsn=29069998_0\", \"Geo-coordinates\": {\"latitude\": \"51.5073\", \"longitude\": \"-0.1277\"}, \"Rating\": \"5\", \"Short Description\": \"Luxury hotel on the Strand\"}, {\"Hotel Name\": \"The Ritz London\", \"Address\": \"150 Piccadilly, London W1J 9BR, UK\", \"Price per night\": \"£1200\", \"Image URL\": \"https://www.theritzlondon.com/sites/default/files/styles/hero_image/public/2023-06/ritz-exterior-1200x630.jpg?h=630&itok=2o1w7N2F\", \"Geo-coordinates\": {\"latitude\": \"51.5079\", \"longitude\": \"-0.1430\"}, \"Rating\": \"5\", \"Short Description\": \"Luxury hotel in Piccadilly\"}], \"Places to Visit Nearby\": [{\"Place Name\": \"Buckingham Palace\", \"Description\": \"The official residence of the British monarch\", \"Image URL\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Buckingham_Palace_2015.jpg/800px-Buckingham_Palace_2015.jpg\", \"Geo-coordinates\": {\"latitude\": \"51.5014\", \"longitude\": \"-0.1419\"}, \"Ticket Pricing\": \"Free (exterior views)\", \"Travel Time\": \"15 mins\"}, {\"Place Name\": \"Tower of London\", \"Description\": \"Historic castle with a rich history\", \"Image URL\": \"https://www.timeout.com/images/105772826/image.jpg\", \"Geo-coordinates\": {\"latitude\": \"51.5080\", \"longitude\": \"-0.0755\"}, \"Ticket Pricing\": \"£30\", \"Travel Time\": \"30 mins\"}, {\"Place Name\": \"British Museum\", \"Description\": \"World-renowned museum with a vast collection of artifacts\", \"Image URL\": \"https://www.timeout.com/images/103686629/image.jpg\", \"Geo-coordinates\": {\"latitude\": \"51.5195\", \"longitude\": \"-0.1268\"}, \"Ticket Pricing\": \"Free\", \"Travel Time\": \"20 mins\"}], \"Day-by-Day Plan\": [{\"Day\": \"Day 1\", \"Activities\": [\"Arrive at the hotel\", \"Check into the hotel\", \"Afternoon Tea at The Savoy\", \"Evening stroll along the Thames\"], \"Travel Time\": \"Variable\", \"Best Time\": \"Anytime\"}, {\"Day\": \"Day 2\", \"Activities\": [\"Visit Buckingham Palace\", \"Tour the Tower of London\", \"Afternoon at the British Museum\", \"Dinner at a Michelin Star restaurant\"], \"Travel Time\": \"30 mins between locations\", \"Best Time\": \"Morning for Buckingham Palace and Tower of London, Afternoon for the British Museum\"}, {\"Day\": \"Day 3\", \"Activities\": [\"Shopping on Oxford Street\", \"Visit Hyde Park\", \"Depart from London\"], \"Travel Time\": \"Variable\", \"Best Time\": \"Morning for Oxford Street and Hyde Park\"}]}"},
        {text: "\n```"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
