import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

const getAuthHeader = (thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (!token) {
    return thunkAPI.rejectWithValue("No token provided");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Fetch Contacts (Eğer token yoksa istek yapma)
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("User is not authenticated");
    }

    try {
      const { data } = await axios.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const config = getAuthHeader(thunkAPI);
      const { data } = await axios.post("/contacts", contactData, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const config = getAuthHeader(thunkAPI);
      await axios.delete(`/contacts/${contactId}`, config);
      return contactId;
    } catch (error) {
      console.error("DELETE Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, values }, thunkAPI) => {
    try {
      const config = getAuthHeader(thunkAPI);
      const payload = {
        name: values.name,
        number: values.phone || values.number, // 📌 "phone" varsa "number" olarak kullan
      };
      const { data } = await axios.patch(`/contacts/${id}`, payload, config);
      return { id, ...data }; // 📌 Güncellenmiş veriyi dön
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
