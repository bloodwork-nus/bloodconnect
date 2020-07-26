import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { firebaseReducer, actionTypes } from "react-redux-firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";

import preferences from "./preferences";
import requests from "./requests";
import donations from "./donations";

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const reducer = persistReducer(persistConfig, combineReducers({
    preferences,
    requests,
    donations,
    firebase: firebaseReducer
}));

export default () => {
    const store = configureStore({
        reducer,
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: {
                    ignoredPaths: ["firebase"],
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
                        ...Object.keys(actionTypes).map((type) => `@@reactReduxFirebase/${type}`)
                    ]
                }
            }),
            // store => next => action => { console.log(store.getState().requests.requests["-MD40o2e4PjLTBoju4Jr"]); return next(action); }
        ]
    });
    
    const persistor = persistStore(store);

    return { store, persistor };
}