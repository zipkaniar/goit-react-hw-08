import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./operations";
import { logout } from "../auth/operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    clearContacts: (state) => {
      state.items = [];
      state.isLoading = false; // API çağrısını durdur
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.items = [];
        state.isLoading = false; // Logout sonrası API çağrısını durdur
        state.error = null;
      });
  },
});

export const { clearContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
