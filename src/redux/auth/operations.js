import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
axios.defaults.baseURL = "https://connections-api.goit.global";

// Persist için token ayarı
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// Kullanıcı kayıt işlemi
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", userData);
      setAuthHeader(data.token); // Tokeni ayarla
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Kullanıcı giriş işlemi
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", userData);
      setAuthHeader(data.token); // Tokeni ayarla
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Kullanıcı çıkış işlemi
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader(); // Tokeni temizle
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Kullanıcı bilgilerini yenileme işlemi
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("Kullanıcı doğrulama başarısız.");
    }

    try {
      setAuthHeader(persistedToken); // Tokeni ayarla
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
