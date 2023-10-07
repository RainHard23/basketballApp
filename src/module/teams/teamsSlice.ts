import {createSlice} from "@reduxjs/toolkit";

import {teamApi, TeamType} from "../../api/teams/api";
import {createAppAsyncThunk} from "../../api/common/utils/create-app-async-thunk";


const getTeamsTC = createAppAsyncThunk<{
    dataTeams: TeamType[];
    count: number;
    size: number;
    page: number;
}, { paramsQuery: any }>("teams/getTeams", async ({paramsQuery}) => {
    try {
        const res = await teamApi.getTeams(paramsQuery);
        console.log(res)
        return {
            dataTeams: res.data,
            count: res.count,
            size: res.size,
            page: res.page,
        };
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
    }
});
type dataTeamsType = {
    dataTeams: TeamType[];
    count: number
    size: number
    page: number
}

const initialState: dataTeamsType = {
    dataTeams: [],
    count: 0,
    size: 0,
    page: 1,
}
const slice = createSlice({
    name: "teams",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTeamsTC.fulfilled, (state, action) => {
                state.dataTeams = action.payload.dataTeams
                state.count = action.payload.count;
                state.size = action.payload.size;
                state.page = action.payload.page;
            })
    },
});


export const teamsReducer = slice.reducer;


export const teamsAction = slice.actions;
export const teamsThunks = {getTeamsTC};

