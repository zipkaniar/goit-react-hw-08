import { createSelector } from "@reduxjs/toolkit";

export const selectContactsState = (state) => state.contacts; // Tüm contacts state'i seçer

export const selectContacts = createSelector(
  [selectContactsState],
  (contacts) => contacts.items || [] // Memoize edilmiş liste
);

// Yükleme durumunu seçer
export const selectContactsLoading = (state) => state.contacts.isLoading;

// Hata durumunu seçer
export const selectContactsError = (state) => state.contacts.error;
