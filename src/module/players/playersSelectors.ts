import { AppRootStateType } from '../../core/redux/store'

export const playersSelector = (state: AppRootStateType) => state.players
export const playersPositionSelector = (state: AppRootStateType) => state.players.position
export const playersPlayerSelector = (state: AppRootStateType) => state.players.player
