
import { createAsyncThunk } from "@reduxjs/toolkit";
import {BaseResponseType} from "../../../types/common.types";
import {AppDispatch, AppRootStateType} from "../../../core/redux/store";


/**
Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null | RejectValueType;
}>();

export type RejectValueType = {
  data: BaseResponseType;
  showGlobalError: boolean;
};
