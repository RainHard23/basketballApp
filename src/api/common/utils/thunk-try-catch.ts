import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { AppDispatch, AppRootStateType } from '../../../core/redux/store'
import { BaseResponseType } from '../../../types/common.types'
import { handleServerNetworkError } from './handle-server-network-error'

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
  }
}
