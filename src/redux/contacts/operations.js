import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Axios Base URL
axios.defaults.baseURL = "https://connections-api.goit.global";

// Fetch Contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue("No token provided");
      }

      const { data } = await axios.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Contacts:", data); // Gelen veriyi kontrol edin
      return data;
    } catch (error) {
      console.error("FETCH Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add Contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue("No token provided");
      }

      const { data } = await axios.post("/contacts", contactData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Added Contact:", data); // Eklenen veriyi kontrol edin
      return data;
    } catch (error) {
      console.error("ADD Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue("No token provided");
      }

      await axios.delete(`/contacts/${contactId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Deleted Contact ID:", contactId); // Silinen ID'yi kontrol edin
      return contactId;
    } catch (error) {
      console.error("DELETE Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Contact
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, values }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue("No token provided");
      }

      const payload = {
        name: values.name,
        number: values.phone || values.number,
      };

      const { data } = await axios.patch(`/contacts/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Updated Contact:", data); // Güncellenen veriyi kontrol edin
      return data;
    } catch (error) {
      console.error("UPDATE Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
