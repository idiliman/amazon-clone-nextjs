import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

export const emailSlice = createSlice({
  name: "userEmail",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = emailSlice.actions;

export default emailSlice.reducer;
