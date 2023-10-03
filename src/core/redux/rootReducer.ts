import { combineReducers } from "@reduxjs/toolkit";
import {authSlice} from "../../api/auth/authSlice";


const rootReducer = combineReducers({
    auth: authSlice
});

export default rootReducer;
