import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import contactsReducer from "./contacts/slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

//  Redux Persist için auth yapılandırması
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"], //  Kullanıcı verisini de sakla
  stateReconciler: autoMergeLevel2, //  Veriyi doğru formatta sakla
};

//  Redux'un rootReducer'ı
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  contacts: contactsReducer,
});

//  Persist Edilmiş Reducer Kullanarak Store'u Kur
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Persist edilen veriler için kontrolü kapat
    }),
});

//  Persistor'u oluştur (Sayfa yenilendiğinde state'i korur)
export const persistor = persistStore(store);
