import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { teamApi, TeamType } from '../../api/teams/api'
import { createSlice } from '@reduxjs/toolkit'
import { playersApi, PlayerType } from '../../api/players/api'
import { imageApi } from '../../api/imageApi'

const getTeamIdTC = createAppAsyncThunk<TeamType, { id?: string }>(
  'players/getPlayerId',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await teamApi.getTeamId(id)
    } catch (error) {
      console.error('Error fetching teams:', error)

      return rejectWithValue(null)
    }
  }
)

export const updateTeamTC = createAppAsyncThunk(
  'teams/updateTeam',
  async (arg: { model: TeamType & { imageFile: File } }, thunkAPI) => {
    try {
      const { imageFile, ...teamData } = arg.model

      // Загрузка изображения, если оно было передано
      const imageUrl = imageFile ? await imageApi.getUploadedImage(imageFile) : ''

      // Обновление данных команды с учетом изображения
      const updatedTeam: TeamType = {
        ...teamData,
        imageUrl,
      }

      await teamApi.updateTeam(updatedTeam)
      return arg
    } catch (error) {
      console.error('Error updating team:', error)
      throw error
    }
  }
)

export const addTeamTC = createAppAsyncThunk(
  'teams/addTeam',
  async (newTeam: TeamType & { imageFile: File }) => {
    try {
      const { imageFile, ...teamData } = newTeam

      // Загрузка изображения, если оно было передано
      const imageUrl = newTeam.imageFile ? await imageApi.getUploadedImage(newTeam.imageFile) : ''

      // Обновление данных нового игрока с учетом аватара
      const teamWithAvatar: TeamType = {
        ...teamData,
        imageUrl,
      }
      const res = await teamApi.addTeam(teamWithAvatar)
      return res
    } catch (error) {
      console.error('Error adding player:', error)
      throw error
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

const getTeamsTC = createAppAsyncThunk<
  {
    count: number
    dataTeams: TeamType[]
    page: number
    size: number
  },
  { paramsQuery?: any }
>('teams/getTeams', async ({ paramsQuery }) => {
  try {
    const res = await teamApi.getTeams(paramsQuery)
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
  filteredTeam?: TeamType
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
        state.filteredTeam = action.payload
      })
  },
})

export const teamsReducer = slice.reducer

export const teamsAction = slice.actions
export const teamsThunks = { addTeamTC, getTeamsTC, deleteTeamTC, updateTeamTC, getTeamIdTC }
