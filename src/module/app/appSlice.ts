import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  error: null as null | string,
  isInitialized: false,
  status: 'idle' as RequestStatusType,
}

export type RequestStatusType = 'failed' | 'idle' | 'loading' | 'succeeded'

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/pending')
        },
        state => {
          state.status = 'loading'
        }
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/rejected')
        },
        (state, action) => {
          const { error, payload } = action

          if (payload) {
            if (payload.showGlobalError) {
              state.error = payload.data.messages.length
                ? payload.data.messages[0]
                : 'Some error occurred'
            }
          } else {
            state.error = error.message ? error.message : 'Some error occurred'
          }
          state.status = 'failed'
        }
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/fulfilled')
        },
        state => {
          state.status = 'succeeded'
        }
      )
      .addDefaultCase((state, action) => {})
  },
  initialState,
  name: 'app',
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
