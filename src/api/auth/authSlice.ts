import {createSlice} from "@reduxjs/toolkit";
import {authAPI, LoginParamsType, RegisterParamsType} from "./api/api";
import {createAppAsyncThunk} from "../common/utils/create-app-async-thunk";
import {handleServerNetworkError} from "../common/utils/handle-server-network-error";
import {ResultCode} from "../common/enums/common.enums";
import {clearTasksAndTodolists} from "../common/actions/common.actions";


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    const res = await authAPI.login(arg);
    if (res.data && res.data?.token) {
        localStorage.setItem('user', JSON.stringify(res.data))
        return {isLoggedIn: true};
    } else {
        const isShowAppError = !res.data.fieldsErrors.length;

        console.log(2)

        return rejectWithValue({data: res.data, showGlobalError: isShowAppError});
    }
});

const register = createAppAsyncThunk<{ isLoggedIn: boolean }, RegisterParamsType>("auth/register", async (arg, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    const res = await authAPI.register(arg);
    if (res.data && res.data?.token) {
        localStorage.setItem('user', JSON.stringify(res.data))
        return {isLoggedIn: true};
    } else {
        const isShowAppError = !res.data.fieldsErrors.length;

        console.log(2)

        return rejectWithValue({data: res.data, showGlobalError: isShowAppError});
    }
});


// Get user from localStorage
// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'))

console.log(user)


const slice = createSlice({
    name: "auth",
    initialState:  {
        user: user ? user : null,
        isLoggedIn: !!user,
    } ,
    reducers: {
        logout(state) {
            localStorage.removeItem("user");
            state.user = null;
            state.isLoggedIn = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
    },
});



export const authSlice = slice.reducer;



export const { logout } = slice.actions;
export const authThunks = {login, register};

