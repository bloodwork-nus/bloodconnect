import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
    name: "requests",
    initialState: {
        requests: { }
    },
    reducers: {
        requestsUpdated: (state, action) => {
            state["requests"] = action.payload.requests;
        }
    }
});

const {
    requestsUpdated
} = slice.actions;

export default slice.reducer;

export const updateRequests = (requests) => requestsUpdated({ requests });

export const getRequests = createSelector(
    state => state.requests,
    requests => requests.requests
);

export const getMyRequests = (requester) => createSelector(
    state => state.requests,
    requests => Object.values(requests.requests).filter((request) => request.requester === requester)
);

export const getRequestById = (id) => createSelector(
    state => state.requests,
    requests => requests.requests[id]
);