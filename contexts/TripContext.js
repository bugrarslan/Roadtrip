import { createContext, useContext, useState } from "react";


const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState([]);
  
    return (
      <TripContext.Provider value={{ tripData, setTripData }}>
        {children}
      </TripContext.Provider>
    );
  };
  
  export const useTrip = () => useContext(TripContext);