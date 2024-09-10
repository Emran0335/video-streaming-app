import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};
const userFromCookie = localStorage.getItem("user");
console.log("userFromCookie", JSON.parse(userFromCookie))
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    unSetUser: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { setUser, unSetUser } = authSlice.actions;

export default authSlice.reducer;


