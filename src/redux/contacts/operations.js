import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global";

// İletişim Silme İşlemi
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// İletişim Güncelleme İşlemi
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, values }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${id}`, values); // Backend'e PATCH isteği
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
