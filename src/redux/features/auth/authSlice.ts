import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: localStorage.getItem("access") || null,
  refreshToken: localStorage.getItem("refresh") || null,
  isAuthenticated: !!localStorage.getItem("access"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access, refresh } = action.payload;
      state.user = user;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
