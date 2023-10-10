import { appReducer } from '../../module/app/appSlice'
import { authSlice } from '../../module/auth/authSlice'
import { playersReducer } from '../../module/players/playersSlice'
import { teamsReducer } from '../../module/teams/teamsSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authSlice,
  players: playersReducer,
  teams: teamsReducer,
})

export default rootReducer
