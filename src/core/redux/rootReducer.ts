import { combineReducers } from "@reduxjs/toolkit";
import {authSlice} from "../../module/auth/authSlice";
import {teamsReducer} from "../../module/teams/teamsSlice";
import {playersReducer} from "../../module/players/playersSlice";
import {appReducer} from "../../module/app/appSlice";


const rootReducer = combineReducers({
    teams: teamsReducer,
    players: playersReducer,
    auth: authSlice,
    app: appReducer
});

export default rootReducer;
