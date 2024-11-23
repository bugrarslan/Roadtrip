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
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location : London, UK, for 3 Days and 2 Night for Family with a Moderate budget with a Flight details , Flight Price with Booking url, Hotel options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days and 2 night with each day plan with best time to visit in JSON format."},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\"location\": \"London, UK\", \"duration\": \"3 Days and 2 Nights\", \"budget\": \"Moderate\", \"travelers\": \"Family\", \"flightDetails\": {\"flight\": \"Sample Flight\", \"price\": \"$800\", \"bookingUrl\": \"https://www.example.com/flights\", \"departureDate\": \"2024-03-15\", \"returnDate\": \"2024-03-17\"}, \"hotelOptions\": [{\"hotelName\": \"The Savoy\", \"address\": \"Strand, London WC2R 0EZ, United Kingdom\", \"price\": \"$300/night\", \"imageUrl\": \"https://www.example.com/savoy.jpg\", \"coordinates\": {\"latitude\": 51.5074, \"longitude\": 0.1262}, \"rating\": \"5 stars\", \"description\": \"Luxury hotel with iconic history, overlooking the Thames.\", \"nearbyPlaces\": [{\"placeName\": \"The British Museum\", \"details\": \"World-renowned museum with vast collection of artifacts.\", \"imageUrl\": \"https://www.example.com/britishmuseum.jpg\", \"coordinates\": {\"latitude\": 51.5194, \"longitude\": 0.1270}, \"ticketPrice\": \"Free\", \"timeToTravelFromHotel\": \"20 mins\"}, {\"placeName\": \"Hyde Park\", \"details\": \"Large park in central London, famous for outdoor activities.\", \"imageUrl\": \"https://www.example.com/hydepark.jpg\", \"coordinates\": {\"latitude\": 51.5074, \"longitude\": -0.1657}, \"ticketPrice\": \"Free\", \"timeToTravelFromHotel\": \"30 mins\"}]}, {\"hotelName\": \"Park Plaza Westminster Bridge\", \"address\": \"200 Westminster Bridge Rd, London SE1 7UT, United Kingdom\", \"price\": \"$200/night\", \"imageUrl\": \"https://www.example.com/parkplaza.jpg\", \"coordinates\": {\"latitude\": 51.5007, \"longitude\": -0.1168}, \"rating\": \"4 stars\", \"description\": \"Modern hotel near the Houses of Parliament and London Eye.\", \"nearbyPlaces\": [{\"placeName\": \"London Eye\", \"details\": \"Giant Ferris wheel with panoramic city views.\", \"imageUrl\": \"https://www.example.com/londoneye.jpg\", \"coordinates\": {\"latitude\": 51.5033, \"longitude\": -0.1195}, \"ticketPrice\": \"£30\", \"timeToTravelFromHotel\": \"5 mins\"}, {\"placeName\": \"Houses of Parliament\", \"details\": \"Home to the UK government, iconic landmark.\", \"imageUrl\": \"https://www.example.com/housesofparliament.jpg\", \"coordinates\": {\"latitude\": 51.4994, \"longitude\": -0.1247}, \"ticketPrice\": \"Free\", \"timeToTravelFromHotel\": \"10 mins\"}]}], \"itinerary\": {\"day1\": {\"bestTimeToVisit\": \"Morning\", \"plan\": \"Visit Buckingham Palace for the changing of the guard ceremony, followed by a stroll through St. James's Park. In the afternoon, explore the British Museum. Evening: Enjoy a West End show.\"}, \"day2\": {\"bestTimeToVisit\": \"Afternoon\", \"plan\": \"Take a ride on the London Eye, then visit the Houses of Parliament and Big Ben. Walk along the South Bank and visit the Tate Modern. Evening: Enjoy dinner in Borough Market.\"}, \"day3\": {\"bestTimeToVisit\": \"Any Time\", \"plan\": \"Explore Hyde Park and Kensington Gardens, visit Kensington Palace. In the afternoon, go shopping on Oxford Street. Depart from London.\"}}}\n```"},
        ],
      },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
