import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: !!Cookies.get("access_token"),
};

const OtpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      Cookies.remove("user");
    },
  },
});

export const { setUser, logout } = OtpSlice.actions;
export default OtpSlice.reducer;
