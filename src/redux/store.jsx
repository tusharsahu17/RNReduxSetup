import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import configReducer from "./config/configSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootPersistConfig = {
    key: 'arogyam-Advisor',
    version: 1,
    storage: AsyncStorage,
    wishList: ["auth", "config"]
}
const rootReducer = combineReducers({
    auth: authReducer,
    config: configReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);
