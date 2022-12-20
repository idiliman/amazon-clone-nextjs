import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import emailReducer from "../slices/emailSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    userEmail: emailReducer,
  },
});
