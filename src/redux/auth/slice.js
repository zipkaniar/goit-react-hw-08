import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logoutSuccess(state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    refreshUserStart(state) {
      state.isRefreshing = true;
    },
    refreshUserSuccess(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    refreshUserFailure(state) {
      state.isRefreshing = false;
    },
  },
});

export const {
  registerSuccess,
  loginSuccess,
  logoutSuccess,
  refreshUserStart,
  refreshUserSuccess,
  refreshUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
