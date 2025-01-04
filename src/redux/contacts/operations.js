import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

// Fetch Contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add Contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const { data } = await axios.post("/contacts", contactData);
      return data;
    } catch (error) {
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
      const token = state.auth.token; // Token alınıyor
      if (!token) {
        return thunkAPI.rejectWithValue("No token provided");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("DELETE Request ID:", contactId); // Silinen ID'yi kontrol edin

      await axios.delete(`/contacts/${contactId}`, config);
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
      const token = state.auth.token; // Token alınıyor
      if (!token) {
        return thunkAPI.rejectWithValue("No token provided");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Doğru anahtar isimlerini kullandığınızdan emin olun
      const payload = {
        name: values.name,
        number: values.phone || values.number, // Eğer "phone" varsa "number" alanına eşle
      };

      console.log("PATCH Request Payload:", payload); // Gönderilen veriyi kontrol edin

      const { data } = await axios.patch(`/contacts/${id}`, payload, config);
      return data;
    } catch (error) {
      console.error("PATCH Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
