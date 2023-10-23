import { AppRootStateType } from '../../core/redux/store'

export const teamsSelector = (state: AppRootStateType) => state.teams
export const teamsDataSelector = (state: AppRootStateType) => state.teams.dataTeams
export const filteredTeamsSelector = (state: AppRootStateType) => state.teams.team
