// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialUser = localStorage.getItem("userInfo");

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    toke: null, // Retrieve toke from cookies
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    settoke: (state, action) => {
     
      state.toke = action.payload;
      Cookies.set("toke", action.payload); // Save toke to cookies
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem("userInfo"); // Remove user info from local storage
      Cookies.remove("toke"); // Remove toke from cookies
      state.user = null;
      state.toke = null;
    },
  },
});

export const { setUser, settoke, setLoading, setError, logout } =
  authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selecttoke = (state) => state.auth.toke;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
