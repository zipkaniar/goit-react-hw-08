import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

// 🔹 API isteğine otomatik olarak token ekleyen yardımcı fonksiyon
const getAuthHeader = (thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (!token) {
    return thunkAPI.rejectWithValue("No token provided");
  }
  return { headers: { Authorization: `Bearer ${token}` } };
};

// ✅ Fetch Contacts (Token ile Güncellendi)
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const config = getAuthHeader(thunkAPI);
      const { data } = await axios.get("/contacts", config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ Add Contact (Token ile Güncellendi)
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

// ✅ Delete Contact (Token ile Güncellendi)
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const config = getAuthHeader(thunkAPI);
      console.log("DELETE Request ID:", contactId);
      await axios.delete(`/contacts/${contactId}`, config);
      return contactId;
    } catch (error) {
      console.error("DELETE Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ Update Contact (Token ile Güncellendi)
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, values }, thunkAPI) => {
    try {
      const config = getAuthHeader(thunkAPI);
      const payload = {
        name: values.name,
        number: values.phone || values.number, // "phone" varsa "number" olarak kullan
      };
      console.log("PATCH Request Payload:", payload);
      const { data } = await axios.patch(`/contacts/${id}`, payload, config);
      return data;
    } catch (error) {
      console.error("PATCH Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
