import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.goit.global";

// Kullanıcı kayıt işlemi
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", userData);
      toast.success("Registration successful!");
      return data;
    } catch (error) {
      toast.error("Registration failed. Please try again.");
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
      toast.success("Login successful!");
      return data;
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Kullanıcı çıkış işlemi
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    toast.success("Logout successful!");
  } catch (error) {
    toast.error("Logout failed. Please try again.");
    return thunkAPI.rejectWithValue(error.message);
  }
});
