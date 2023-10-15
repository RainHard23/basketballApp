import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { ParamsType, playersApi, PlayerType } from '../../api/players/api'
import { teamApi, TeamType } from '../../api/teams/api'
import { createSlice } from '@reduxjs/toolkit'

const updatePlayerTC = createAppAsyncThunk(
  'teams/updateTeam',
  async (arg: { model: PlayerType }, thunkAPI) => {
    try {
      await playersApi.updatePlayer(arg.model)
      return arg
    } catch (error) {
      return thunkAPI.rejectWithValue(null)
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

export const addPlayerTC = createAppAsyncThunk(
  'players/addPlayer',
  async (newPlayer: PlayerType) => {
    try {
      const res = await playersApi.addPlayer(newPlayer)

      return res
    } catch (error) {
      console.error('Error adding team:', error)
      throw error
    }
  }
)

const getPlayersIdTC = createAppAsyncThunk<PlayerType, { id: number }>(
  'players/getPlayerId',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await playersApi.getPlayerId(id)

      console.log(res)

      return res
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
}
