import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
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
      console.log("🔴 Kullanıcı çıkış yaptı, contacts sıfırlanıyor...");
      state.items = [];
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
      .addCase(logout.fulfilled, (state) => {
        console.log("🔴 Kullanıcı çıkış yaptı, contacts sıfırlanıyor...");
        state.items = [];
      });
  },
});

// 🛑 Logout sonrası temizleme işlemini desteklemek için export ediyoruz
export const { clearContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
