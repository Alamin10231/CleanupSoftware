import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  prime_phone: string;
  username: string;
  user_type: "admin" | "supervisor" | "client" | string;
  is_active: boolean;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  otp: string | null;
}

interface LoginResponse {
  user: User;
  access: string;
  refresh: string;
}

// Helper functions for localStorage with error handling
const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
};

const saveToLocalStorage = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
};

// Initial state
const initialState: AuthState = {
  user: getFromLocalStorage<User | null>("user", null),
  accessToken: getFromLocalStorage<string | null>("access", null),
  refreshToken: getFromLocalStorage<string | null>("refresh", null),
  isAuthenticated: !!getFromLocalStorage<string | null>("access", null),
  otp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { user, access, refresh } = action.payload;

      // Update state
      state.user = user;
      state.accessToken = access;
      state.refreshToken = refresh;
      state.isAuthenticated = true;
      // Save to localStorage
      saveToLocalStorage("user", user);
      saveToLocalStorage("access", access);
      saveToLocalStorage("refresh", refresh);

      // Debug: Log what we're storing
      // console.log("Storing user:", user);
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveToLocalStorage("user", state.user);
      }
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      saveToLocalStorage("access", action.payload);
    },

    logout: (state) => {
      // Clear state
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      // Clear localStorage
      removeFromLocalStorage("user");
      removeFromLocalStorage("access");
      removeFromLocalStorage("refresh");
    },

    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },

    // Helper action to rehydrate state from localStorage
    rehydrateAuth: (state) => {
      state.user = getFromLocalStorage<User | null>("user", null);
      state.accessToken = getFromLocalStorage<string | null>("access", null);
      state.refreshToken = getFromLocalStorage<string | null>("refresh", null);
      state.isAuthenticated = !!state.accessToken;
    },
  },
});

export const {
  setCredentials,
  updateUser,
  updateAccessToken,
  logout,
  rehydrateAuth,
  setOtp,
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectOtp = (state: { auth: AuthState }) => state.auth.otp;
export default authSlice.reducer
