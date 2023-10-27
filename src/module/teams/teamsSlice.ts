import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { ParamsTypeTeam, teamApi, TeamType } from '../../api/teams/api'
import { createSlice } from '@reduxjs/toolkit'
import { imageApi } from '../../api/imageApi'
import { playersApi, PlayerType } from '../../api/players/api'
import { handleServerNetworkError } from '../../api/common/utils/handle-server-network-error'
import { NotificationActions } from '../../common/components/ui/notificationSlice'

const getTeamIdTC = createAppAsyncThunk<TeamType, { id?: string }>(
  'players/getPlayerId',
  async ({ id }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      return await teamApi.getTeamId(id)
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const updateTeamTC = createAppAsyncThunk(
  'teams/updateTeam',
  async (arg: { model: TeamType & { imageFile?: File; imageUrlLogo?: string } }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      const { imageFile, imageUrlLogo, ...teamData } = arg.model

      // Загрузка изображения, если оно было передано
      const imageUrl = imageFile ? await imageApi.getUploadedImage(imageFile) : imageUrlLogo || ''

      // Обновление данных команды с учетом изображения
      const updatedTeam: TeamType = {
        ...teamData,
        imageUrl,
      }

      await teamApi.updateTeam(updatedTeam)

      dispatch(
        NotificationActions.addNotification({
          type: 'success',
          message: 'Team successfully updated!',
        })
      )

      return arg
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      dispatch(
        NotificationActions.addNotification({
          type: 'error',
          message: 'Failed to update team.',
        })
      )

      return rejectWithValue(null)
    }
  }
)

export const addTeamTC = createAppAsyncThunk(
  'teams/addTeam',
  async (newTeam: TeamType & { imageFile: File }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      const { imageFile, ...teamData } = newTeam

      // Загрузка изображения, если оно было передано
      const imageUrl = newTeam.imageFile ? await imageApi.getUploadedImage(newTeam.imageFile) : ''

      // Обновление данных новой команды с учетом изображения
      const teamWithImageUrl: TeamType = {
        ...teamData,
        imageUrl,
      }

      const res = await teamApi.addTeam(teamWithImageUrl)

      dispatch(
        NotificationActions.addNotification({
          type: 'success',
          message: 'Team successfully added!',
        })
      )

      return res
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      dispatch(
        NotificationActions.addNotification({
          type: 'error',
          message: 'Such team already exists.',
        })
      )

      return rejectWithValue(null)
    }
  }
)
export const deleteTeamTC = createAppAsyncThunk(
  'teams/deleteTeam',
  async (teamId: number, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      await teamApi.deleteTeam(teamId)

      dispatch(
        NotificationActions.addNotification({
          type: 'success',
          message: 'Team successfully deleted!',
        })
      )

      return teamId
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      dispatch(
        NotificationActions.addNotification({
          type: 'error',
          message: 'Failed to delete team.',
        })
      )

      return rejectWithValue(null)
    }
  }
)
const getTeamPlayers = createAppAsyncThunk(
  'teams/getTeamPlayers',
  async (ParamasTeamId: Array<{ value: string }>, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      const response = await playersApi.getPlayerTeamIds(ParamasTeamId)
      return response.data
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

const getTeamsTC = createAppAsyncThunk<
  {
    count: number
    dataTeams: TeamType[]
    page: number
    size: number
  },
  { paramsQuery?: ParamsTypeTeam }
>('teams/getTeams', async ({ paramsQuery }, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI
  try {
    const res = await teamApi.getTeams(paramsQuery)
    return {
      count: res.count,
      dataTeams: res.data,
      page: res.page,
      size: res.size,
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

type dataTeamsType = {
  count: number
  dataTeams: TeamType[]
  page: number
  size: number
  team?: TeamType
  teamPlayers?: PlayerType[]
}

const initialState: dataTeamsType = {
  teamPlayers: [],
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
      .addCase(getTeamPlayers.fulfilled, (state, action) => {
        state.teamPlayers = action.payload.data
      })
      .addCase(getTeamIdTC.fulfilled, (state, action) => {
        state.team = action.payload
      })
  },
})

export const teamsReducer = slice.reducer

export const teamsAction = slice.actions
export const teamsThunks = {
  addTeamTC,
  getTeamsTC,
  deleteTeamTC,
  updateTeamTC,
  getTeamIdTC,
  getTeamPlayers,
}
