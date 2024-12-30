import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./operations";
import { selectContacts } from "./selectors";
import { selectNameFilter } from "../filters/selectors";

const initialState = {
  contacts: {
    items: [], // Başlangıç değeri boş bir dizi olmalı
    loading: false,
    error: null,
  },
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload || [];
        state.contacts.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items.push(action.payload);
        state.contacts.loading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(addContact.pending, (state) => {
        state.contacts.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload.id
        );
        state.contacts.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.contacts.loading = true;
      });
  },
});

// Selector for filtered contacts
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
);

export default contactsSlice.reducer;
