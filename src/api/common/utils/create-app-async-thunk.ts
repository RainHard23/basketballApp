import { AppDispatch, AppRootStateType } from '../../../core/redux/store'
import { BaseResponseType } from '../../../types/common.types'
import { createAsyncThunk } from '@reduxjs/toolkit'

/**
Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  rejectValue: RejectValueType | null
  state: AppRootStateType
}>()

export type RejectValueType = {
  data: BaseResponseType
  showGlobalError: boolean
}
