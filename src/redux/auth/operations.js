import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAxiosInstance, setAuthAxios } from "../api/authAxios";

// Register
export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authAxiosInstance.post("/users/signup", userData);
      return response.data;
    } catch (error) {
      console.error("REGISTER Error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authAxiosInstance.post("/users/login", userData);
      const token = response.data.token;

      if (token) {
        setAuthAxios(token);
      }

      return response.data;
    } catch (error) {
      console.error("LOGIN Error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  if (token) {
    setAuthAxios(token);
    try {
      await authAxiosInstance.post("/users/logout");
      setAuthAxios(null);
    } catch (error) {
      console.error("LOGOUT Error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});
