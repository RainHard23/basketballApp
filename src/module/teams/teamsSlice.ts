import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { TeamType, teamApi } from '../../api/teams/api'
import { createSlice } from '@reduxjs/toolkit'

export const addTeamTC = createAppAsyncThunk('teams/addTeam', async (newTeam: TeamType) => {
  try {
    const res = await teamApi.addTeam(newTeam)

    return res
  } catch (error) {
    console.error('Error adding team:', error)
    throw error
  }
})

const getTeamsTC = createAppAsyncThunk<
  {
    count: number
    dataTeams: TeamType[]
    page: number
    size: number
  },
  { paramsQuery: any }
>('teams/getTeams', async ({ paramsQuery }) => {
  try {
    const res = await teamApi.getTeams(paramsQuery)

    console.log(res)

    return {
      count: res.count,
      dataTeams: res.data,
      page: res.page,
      size: res.size,
    }
  } catch (error) {
    console.error('Error fetching teams:', error)
    throw error
  }
})

type dataTeamsType = {
  count: number
  dataTeams: TeamType[]
  page: number
  size: number
}

const initialState: dataTeamsType = {
  count: 0,
  dataTeams: [],
  page: 1,
  size: 0,
}
const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(getTeamsTC.fulfilled, (state, action) => {
        state.dataTeams = action.payload.dataTeams
        state.count = action.payload.count
        state.size = action.payload.size
        state.page = action.payload.page
      })
      .addCase(addTeamTC.fulfilled, (state, action) => {
        state.dataTeams.push(action.payload)
      })
  },
  initialState: initialState,
  name: 'teams',
  reducers: {},
})

export const teamsReducer = slice.reducer

export const teamsAction = slice.actions
export const teamsThunks = { addTeamTC, getTeamsTC }
