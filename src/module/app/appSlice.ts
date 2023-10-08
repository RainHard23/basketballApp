import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
};
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action: AnyAction) => {
                    return action.type.endsWith("/pending");
                },
                (state) => {
                    state.status = "loading";
                },
            )
            .addMatcher(
                (action: AnyAction) => {
                    return action.type.endsWith("/rejected");
                },
                (state, action) => {
                    const { payload, error } = action;
                    if (payload) {
                        if (payload.showGlobalError) {
                            state.error = payload.data.messages.length ? payload.data.messages[0] : "Some error occurred";
                        }
                    } else {
                        state.error = error.message ? error.message : "Some error occurred";
                    }
                    state.status = "failed";
                },
            )
            .addMatcher(
                (action: AnyAction) => {
                    return action.type.endsWith("/fulfilled");
                },
                (state) => {
                    state.status = "succeeded";
                },
            )
            .addDefaultCase((state, action) => {
                console.log(action);
            });
    },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
