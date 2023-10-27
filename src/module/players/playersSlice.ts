import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { ParamsType, playersApi, PlayerType } from '../../api/players/api'
import { createSlice } from '@reduxjs/toolkit'
import { imageApi } from '../../api/imageApi'
import { handleServerAppError } from '../../api/common/utils/handle-server-app-error'
import { appActions } from '../app/appSlice'
import { handleServerNetworkError } from '../../api/common/utils/handle-server-network-error'
import { teamApi } from '../../api/teams/api'
import { useNotification } from '../../common/components/ui/useNotification'
import { NotificationActions } from '../../common/components/ui/notificationSlice'

// const { displayNotification } = useNotification()

const getPositionPlayerTC = createAppAsyncThunk(
  'players/getPositionPlayer',
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      const response = await playersApi.getPositionPlayer()
      return response.data
    } catch (error) {
      return rejectWithValue(null)
    }
  }
)
export const updatePlayerTC = createAppAsyncThunk(
  'players/updatePlayer',
  async (arg: { model: PlayerType & { imageFile?: File; imageUrlLogo?: string } }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      const { imageFile, imageUrlLogo, ...playerData } = arg.model
      // Загрузка изображения, если оно было передано
      const avatarUrl = imageFile ? await imageApi.getUploadedImage(imageFile) : imageUrlLogo || ''
      // Обновление данных игрока с учетом изображения
      const updatedPlayer: PlayerType = {
        ...playerData,
        avatarUrl,
      }

      await playersApi.updatePlayer(updatedPlayer)
      dispatch(
        NotificationActions.addNotification({
          type: 'success',
          message: 'Player successfully updated!',
        })
      )

      return arg
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      dispatch(
        NotificationActions.addNotification({
          type: 'error',
          message: 'Failed to update player.', // Можно уточнить сообщение, если тип ошибки известен
        })
      )
      return rejectWithValue(null)
    }
  }
)

export const addPlayerTC = createAppAsyncThunk(
  'players/addPlayer',
  async (newPlayer: PlayerType & { imageFile: File }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI
    try {
      const { imageFile, ...playerData } = newPlayer

      // Загрузка изображения, если оно было передано
      const avatarUrl = imageFile ? await imageApi.getUploadedImage(imageFile) : ''

      // Обновление данных нового игрока с учетом аватара
      const playerWithAvatar: PlayerType = {
        ...playerData,
        avatarUrl,
      }

      const response = await playersApi.addPlayer(playerWithAvatar)

      dispatch(
        NotificationActions.addNotification({
          type: 'success',
          message: 'Player successfully added!',
        })
      )

      return response
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      dispatch(
        NotificationActions.addNotification({
          type: 'error',
          message: 'Such player already exists.',
        })
      )

      return rejectWithValue(null)
    }
  }
)

export const getPlayersWithTeamsTC = createAppAsyncThunk(
  'players/getPlayersWithTeams',
  async (paramsQuery: ParamsType, thunkAPI) => {
    try {
      const response = await playersApi.getPlayers(paramsQuery)
      const { data, count, size } = response.data

      const uniqueTeamIds = Array.from(new Set(data.map(player => player.team)))

      const teamsResponses = await Promise.all<any>(uniqueTeamIds.map(id => teamApi.getTeamId(id)))

      // Преобразуем массив ответов в объект для быстрого доступа
      const teamsMap = teamsResponses.reduce((acc, team) => {
        acc[team.id] = team.name
        return acc
      }, {})

      const playersWithTeamsName = data.map(player => ({
        ...player,
        teamName: teamsMap[player.team],
      }))

      return {
        playersWithTeams: playersWithTeamsName,
        count,
        size,
      }
    } catch (error) {
      handleServerNetworkError(error, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  }
)

export const deletePlayerTC = createAppAsyncThunk(
  'players/deletePlayer',
  async (playerId: number, thunkAPI) => {
    const { dispatch } = thunkAPI
    try {
      await playersApi.deletePlayer(playerId)

      dispatch(
        NotificationActions.addNotification({
          type: 'success',
          message: 'Player successfully deleted!',
        })
      )
      return playerId
    } catch (error) {
      handleServerNetworkError(error, dispatch)

      dispatch(
        NotificationActions.addNotification({
          type: 'error',
          message: 'Failed to delete player.',
        })
      )
      return thunkAPI.rejectWithValue(null)
    }
  }
)

const getPlayersIdTC = createAppAsyncThunk<PlayerType, { id: number }>(
  'players/getPlayerId',
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      return await playersApi.getPlayerId(id)
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  }
)

const getPlayersTC = createAppAsyncThunk<
  {
    count: number
    dataPlayers: PlayerType[]
    page: number
    size: number
  },
  { paramsQuery: ParamsType }
>('player/getPlayers', async ({ paramsQuery }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    const res = await playersApi.getPlayers(paramsQuery)
    return {
      count: res.data.count,
      dataPlayers: res.data.data,
      page: res.data.page,
      size: res.data.size,
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

type dataPlayersType = {
  count: number
  dataPlayers: PlayerType[]
  page: number
  player?: PlayerType
  size: number
  position?: string[]
  playersWithTeams: PlayerType[]
}

const initialState: dataPlayersType = {
  playersWithTeams: [],
  count: 0,
  dataPlayers: [],
  page: 1,
  size: 0,
}
const slice = createSlice({
  initialState: initialState,
  name: 'players',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPlayersTC.fulfilled, (state, action) => {
        state.dataPlayers = action.payload.dataPlayers
        state.count = action.payload.count
        state.size = action.payload.size
        state.page = action.payload.page
      })
      .addCase(getPlayersIdTC.fulfilled, (state, action) => {
        state.player = action.payload
      })
      .addCase(addPlayerTC.fulfilled, (state, action) => {
        state.dataPlayers.push(action.payload.data)
      })
      .addCase(deletePlayerTC.fulfilled, (state, action) => {
        state.dataPlayers = state.dataPlayers.filter(player => player.id !== action.payload)
      })
      .addCase(updatePlayerTC.fulfilled, (state, action) => {
        const updatedPlayerIndex = state.dataPlayers.findIndex(
          team => String(team.id) === String(action.payload.model.id)
        )
        if (updatedPlayerIndex !== -1) {
          state.dataPlayers[updatedPlayerIndex] = action.payload.model
        }
      })
      .addCase(getPositionPlayerTC.fulfilled, (state, action) => {
        state.position = action.payload
      })
      .addCase(getPlayersWithTeamsTC.fulfilled, (state, action) => {
        state.playersWithTeams = action.payload.playersWithTeams
        state.count = action.payload.count
        state.size = action.payload.size
      })
  },
})

export const playersReducer = slice.reducer

export const playersAction = slice.actions
export const playersThunks = {
  addPlayerTC,
  getPlayersIdTC,
  getPlayersTC,
  deletePlayerTC,
  updatePlayerTC,
  getPositionPlayerTC,
  getPlayersWithTeamsTC,
}
