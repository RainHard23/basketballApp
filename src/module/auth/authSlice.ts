import { LoginParamsType, RegisterParamsType, authAPI } from '../../api/auth/api/api'
import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { createSlice } from '@reduxjs/toolkit'

const loginTC = createAppAsyncThunk<{ isLoggedIn: boolean; user: any }, LoginParamsType>(
  'auth/login',
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await authAPI.login(arg)

    if (res.data && res.data?.token) {
      let userData = JSON.stringify(res.data)
      localStorage.setItem('user', userData)

      return { isLoggedIn: true, user: JSON.parse(userData) }
    } else {
      const isShowAppError = !res.data.fieldsErrors.length

      return rejectWithValue({ data: res.data, showGlobalError: isShowAppError })
    }
  }
)

const registrationTC = createAppAsyncThunk<{ isLoggedIn: boolean; user: any }, RegisterParamsType>(
  'auth/register',
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    const res = await authAPI.register(arg)

    if (res.data && res.data?.token) {
      localStorage.setItem('user', JSON.stringify(res.data))

      let userData = JSON.stringify(res.data)
      localStorage.setItem('user', userData)

      return { isLoggedIn: true, user: JSON.parse(userData) }
    } else {
      const isShowAppError = !res.data.fieldsErrors.length

      return rejectWithValue({ data: res.data, showGlobalError: isShowAppError })
    }
  }
)

const userJSON = localStorage.getItem('user')
const user = userJSON ? JSON.parse(userJSON) : null

const slice = createSlice({
  initialState: {
    isLoggedIn: !!user,
    user: user || null,
  },
  name: 'auth',
  reducers: {
    logout(state) {
      localStorage.removeItem('user')
      state.user = null
      state.isLoggedIn = false
      // window.location.href = '/';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
        state.user = action.payload.user
      })
      .addCase(registrationTC.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
        state.user = action.payload.user
      })
  },
})

export const authSlice = slice.reducer

export const { logout } = slice.actions
export const authThunks = { loginTC, registrationTC }
