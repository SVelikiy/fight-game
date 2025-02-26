import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { battleReduser } from "./game/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistAuthConfig = {
  key: "user-token",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);


export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    battle: battleReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
