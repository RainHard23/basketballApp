import {createSlice} from "@reduxjs/toolkit";

import {teamApi, TeamType} from "../../api/teams/api";
import {createAppAsyncThunk} from "../../api/common/utils/create-app-async-thunk";
import {playersApi, PlayerType} from "../../api/players/api";


const getPlayersTC = createAppAsyncThunk<{
    dataPlayers: PlayerType[];
    count: number;
    size: number;
    page: number;
}, { paramsQuery: any }>("players/getPlayers", async ({paramsQuery}) => {
    try {
        const res = await playersApi.getPlayers(paramsQuery);
        console.log(res)
        return {
            dataPlayers: res.data,
            count: res.count,
            size: res.size,
            page: res.page,
        };
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
});
type dataPlayersType = {
    dataPlayers: PlayerType[];
    count: number
    size: number
    page: number
}

const initialState: dataPlayersType = {
    dataPlayers: [],
    count: 0,
    size: 0,
    page: 1,
}
const slice = createSlice({
    name: "players",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPlayersTC.fulfilled, (state, action) => {
                state.dataPlayers = action.payload.dataPlayers
                state.count = action.payload.count;
                state.size = action.payload.size;
                state.page = action.payload.page;
            })
    },
});


export const playersReducer = slice.reducer;


export const playersAction = slice.actions;
export const playersThunks = {getPlayersTC};

