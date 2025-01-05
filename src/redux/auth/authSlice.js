import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { register, login, logout } from "./operations";

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    let token = state.auth.token;

    // Eğer Redux'ta token yoksa, LocalStorage'dan al
    if (!token) {
      try {
        const persistedAuth = localStorage.getItem("persist:auth");

        if (persistedAuth) {
          const parsedAuth = JSON.parse(persistedAuth);
          token = parsedAuth?.token?.replace(/"/g, ""); // String olarak al ve temizle
        }
      } catch (error) {}
    }

    if (!token || typeof token !== "string" || token.length < 10) {
      return thunkAPI.rejectWithValue("Token geçersiz.");
    }

    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const response = await axios.get(
        "https://connections-api.goit.global/users/current"
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch(logout());
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;
