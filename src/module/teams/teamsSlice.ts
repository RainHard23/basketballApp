import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { TeamType, teamApi } from '../../api/teams/api'
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { playersApi, PlayerType } from '../../api/players/api'

const getTeamIdTC = createAppAsyncThunk<TeamType, { id?: string }>(
  'players/getPlayerId',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await teamApi.getTeamId(id)
      return res
    } catch (error) {
      console.error('Error fetching teams:', error)

      return rejectWithValue(null)
    }
  }
)

const updateTeamTC = createAppAsyncThunk(
  'teams/updateTeam',
  async (arg: { model: TeamType }, thunkAPI) => {
    try {
      await teamApi.updateTeam(arg.model)
      return arg
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
    }
  }
)
export const deleteTeamTC = createAppAsyncThunk('teams/deleteTeam', async (teamId: number) => {
  try {
    await teamApi.deleteTeam(teamId)
    return teamId
  } catch (error) {
    throw error
  }
})

export const addTeamTC = createAppAsyncThunk('teams/addTeam', async (newTeam: TeamType) => {
  try {
    const res = await teamApi.addTeam(newTeam)
    return res
  } catch (error) {
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
  team?: TeamType
}

const initialState: dataTeamsType = {
  count: 0,
  dataTeams: [],
  page: 1,
  size: 0,
}
const slice = createSlice({
  initialState: initialState,
  name: 'teams',
  reducers: {},
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
      .addCase(deleteTeamTC.fulfilled, (state, action) => {
        state.dataTeams = state.dataTeams.filter(team => team.id !== action.payload)
      })
      .addCase(updateTeamTC.fulfilled, (state, action) => {
        const updatedTeamIndex = state.dataTeams.findIndex(
          team => String(team.id) === String(action.payload.model.id)
        )

        if (updatedTeamIndex !== -1) {
          state.dataTeams[updatedTeamIndex] = action.payload.model
        }
      })
      .addCase(getTeamIdTC.fulfilled, (state, action) => {
        state.team = action.payload
      })
  },
})

export const teamsReducer = slice.reducer

export const teamsAction = slice.actions
export const teamsThunks = { addTeamTC, getTeamsTC, deleteTeamTC, updateTeamTC, getTeamIdTC }
