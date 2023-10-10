import { createAppAsyncThunk } from '../../api/common/utils/create-app-async-thunk'
import { ParamsType, PlayerType, playersApi } from '../../api/players/api'
import { TeamType, teamApi } from '../../api/teams/api'
import { addTeamTC } from '../teams/teamsSlice'
import { createSlice } from '@reduxjs/toolkit'

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
  },
  initialState: initialState,
  name: 'players',
  reducers: {},
})

export const playersReducer = slice.reducer

export const playersAction = slice.actions
export const playersThunks = { addPlayerTC, getPlayersIdTC, getPlayersTC }
