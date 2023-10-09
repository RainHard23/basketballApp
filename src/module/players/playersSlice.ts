import {createSlice} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../../api/common/utils/create-app-async-thunk";
import {ParamsType, playersApi, PlayerType} from "../../api/players/api";

const getPlayersIdTC = createAppAsyncThunk<PlayerType, { id: number }>(
    "players/getPlayerId",
    async ({id}, {rejectWithValue}) => {

        try {

            const res = await playersApi.getPlayerId(id);
            console.log(res)
            return res;

        } catch (error) {
            console.error("Error fetching teams:", error);
            return rejectWithValue(null);
        }
    }
);

const getPlayersTC = createAppAsyncThunk<{
    dataPlayers: PlayerType[];
    count: number;
    size: number;
    page: number;
    team: any;
}, { paramsQuery: ParamsType }>("player/getPlayers", async ({paramsQuery}) => {
    try {
        const res = await playersApi.getPlayers(paramsQuery);
        const team = await playersApi.getTeam(paramsQuery);
        return {
            dataPlayers: res.data,
            count: res.count,
            size: res.size,
            page: res.page,
            team: team,
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
    team: any
    player?: PlayerType
}

const initialState: dataPlayersType = {
    dataPlayers: [],
    count: 0,
    size: 0,
    page: 1,
    team: [],

}
const slice = createSlice({
    name: "players",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPlayersTC.fulfilled, (state, action) => {
                state.dataPlayers = action.payload.dataPlayers;
                state.count = action.payload.count;
                state.size = action.payload.size;
                state.page = action.payload.page;
                state.team = action.payload.team;
            })
            .addCase(getPlayersIdTC.fulfilled, (state, action) => {
                state.player = action.payload;
                // Добавьте другую логику, если это необходимо
            });
    },
});


export const playersReducer = slice.reducer;


export const playersAction = slice.actions;
export const playersThunks = {getPlayersTC, getPlayersIdTC};

