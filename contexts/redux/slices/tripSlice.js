import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tripData: [],
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setTripData: (state, action) => {
      state.tripData = action.payload;
    },
    clearTripData: (state) => {
      state.tripData = [];
    },
  },
});

export const { setTripData, clearTripData } = tripSlice.actions;

export default tripSlice.reducer;
