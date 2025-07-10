// src/redux/carSlice.js
import { createSlice } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
  },
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
  },
});

export const { setCars } = carSlice.actions;
export default carSlice.reducer;
