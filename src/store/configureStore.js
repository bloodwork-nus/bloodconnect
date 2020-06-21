import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import preferences from "./preferences";
import requests from "./requests";
import donations from "./donations";

const reducers = combineReducers({
    preferences,
    requests,
    donations
});

export default () => {
    const store = configureStore(reducers);

    return { store };
}