import { appReducer } from '../../module/app/appSlice'
import { authSlice } from '../../module/auth/authSlice'
import { playersReducer } from '../../module/players/playersSlice'
import { teamsReducer } from '../../module/teams/teamsSlice'
import { combineReducers } from '@reduxjs/toolkit'
import { NotificationReducer } from '../../common/components/notification/notificationSlice'

const rootReducer = combineReducers({
  notification: NotificationReducer,
  app: appReducer,
  auth: authSlice,
  players: playersReducer,
  teams: teamsReducer,
})

export default rootReducer
