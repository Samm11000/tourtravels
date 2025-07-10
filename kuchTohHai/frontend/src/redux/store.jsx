import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./carSlice";

const store = configureStore({
  reducer: {
    cars: carReducer,
  },
  devTools: true, // explicitly enable devTools
});

export default store;
