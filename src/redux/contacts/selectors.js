// Redux state'teki tüm kişileri seçer
export const selectContacts = (state) => state.contacts.items || [];

// Yükleme durumunu seçer
export const selectContactsLoading = (state) => state.contacts.isLoading;

// Hata durumunu seçer
export const selectContactsError = (state) => state.contacts.error;
