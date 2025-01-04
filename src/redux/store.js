import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import contactsReducer from "./contacts/slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // Sadece token'ı sakla
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  contacts: contactsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
