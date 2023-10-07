import { combineReducers } from "@reduxjs/toolkit";
import {authSlice} from "../../api/auth/authSlice";
import {teamsReducer} from "../../module/teams/teamsSlice";


const rootReducer = combineReducers({
    teams: teamsReducer,
    auth: authSlice
});

export default rootReducer;
