import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import contactsReducer from "./contacts/slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// 🟢 Redux Persist yapılandırması
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
  stateReconciler: autoMergeLevel2,
};

// 🟢 Root Reducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  contacts: contactsReducer,
});

// 🟢 Store'u oluştur
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Persist edilen veriler için kontrolü kapat
    }),
});

export const persistor = persistStore(store);
