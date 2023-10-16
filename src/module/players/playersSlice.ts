import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { ParamsType, playersApi, PlayerType } from '../../api/players/api'
import { teamApi, TeamType } from '../../api/teams/api'
import { createSlice } from '@reduxjs/toolkit'
import { imageApi } from '../../api/imageApi'

const getPositionPlayerTC = createAppAsyncThunk('players/getPositionPlayer', async thunkAPI => {
  try {
    const response = await playersApi.getPositionPlayer()
    return response.data
  } catch (error) {
    // return thunkAPI.rejectWithValue(null);
  }
})

export const updatePlayerTC = createAppAsyncThunk(
  'players/updatePlayer',
  async (arg: { model: PlayerType & { imageFile: File } }, thunkAPI) => {
    try {
      const { imageFile, ...playerData } = arg.model

      // Загрузка изображения, если оно было передано
      const avatarUrl = imageFile ? await imageApi.getUploadedImage(imageFile) : ''

      // Обновление данных игрока с учетом изображения
      const updatedPlayer: PlayerType = {
        ...playerData,
        avatarUrl,
      }

      await playersApi.updatePlayer(updatedPlayer)
      return arg
    } catch (error) {
      console.error('Error updating player:', error)
      throw error
    }
  }
)

export const addPlayerTC = createAppAsyncThunk(
  'players/addPlayer',
  async (newPlayer: PlayerType & { imageFile: File }) => {
    try {
      const { imageFile, ...playerData } = newPlayer

      // Загрузка изображения, если оно было передано
      const avatarUrl = newPlayer.imageFile
        ? await imageApi.getUploadedImage(newPlayer.imageFile)
        : ''

      // Обновление данных нового игрока с учетом аватара
      const playerWithAvatar: PlayerType = {
        ...playerData,
        avatarUrl,
      }
      const res = await playersApi.addPlayer(playerWithAvatar)
      return res
    } catch (error) {
      console.error('Error adding player:', error)
      throw error
    }
  }
)

export const deletePlayerTC = createAppAsyncThunk(
  'players/deletePlayer',
  async (deletePlayer: number) => {
    try {
      await playersApi.deletePlayer(deletePlayer)
      return deletePlayer
    } catch (error) {
      throw error
    }
  }
)

const getPlayersIdTC = createAppAsyncThunk<PlayerType, { id: number }>(
  'players/getPlayerId',
  async ({ id }, { rejectWithValue }) => {
    try {
      return await playersApi.getPlayerId(id)
    } catch (error) {
      console.error('Error fetching teams:', error)

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
    team: any
  },
  { paramsQuery: ParamsType }
>('player/getPlayers', async ({ paramsQuery }) => {
  try {
    const res = await playersApi.getPlayers(paramsQuery)
    const team = await playersApi.getTeam(paramsQuery)

    return {
      count: res.count,
      dataPlayers: res.data,
      page: res.page,
      size: res.size,
      team: team,
    }
  } catch (error) {
    console.error('Error fetching teams:', error)
    throw error
  }
})

type dataPlayersType = {
  count: number
  dataPlayers: PlayerType[]
  page: number
  player?: PlayerType
  size: number
  team: any
  position?: string[]
}

const initialState: dataPlayersType = {
  count: 0,
  dataPlayers: [],
  page: 1,
  size: 0,
  team: [],
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
        state.team = action.payload.team
      })
      .addCase(getPlayersIdTC.fulfilled, (state, action) => {
        state.player = action.payload
      })
      .addCase(addPlayerTC.fulfilled, (state, action) => {
        state.dataPlayers.push(action.payload)
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
}
