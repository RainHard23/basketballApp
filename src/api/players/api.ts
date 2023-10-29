import { instance } from '../common/api/commonApi'

export const playersApi = {
  addPlayer(newPlayer: PlayerType) {
    return instance.post<PlayerType>('api/Player/Add', newPlayer)
  },
  getPlayerId(id: number) {
    return instance
      .get<PlayerType>('api/Player/Get', {
        params: { id: id },
      })
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching teams:', error)
        throw error
      })
  },
  getPlayers(paramsQuery: ParamsType) {
    return instance.get<PlayersType>('api/Player/GetPlayers', {
      params: paramsQuery,
    })
  },

  deletePlayer(playerId: number) {
    return instance.delete<PlayerType>(`/api/Player/Delete?id=${playerId}`)
  },
  updatePlayer(model: PlayerType) {
    return instance.put<PlayerType>('api/Player/Update', model)
  },
  getPositionPlayer() {
    return instance.get<string[]>('api/Player/GetPositions')
  },
  getPlayerTeamIds(TeamId: Array<{ value: string }>) {
    const newParams = TeamId.map(el => ['TeamIds', el.value])
    const Params = new URLSearchParams(newParams).toString()
    return instance.get<PlayersType>(`api/Player/GetPlayers?${Params}`)
  },
}

export type ParamsType = {
  page: number
  pageSize: number
}

export type PlayersType = {
  count: number
  data: PlayerType[]
  page: number
  size: number
  team: number
}

export type PlayerType = {
  avatarUrl?: string
  birthday: Date | string
  height: number
  id?: number
  name: string
  number: number
  position: string
  team: number
  teamName?: string
  weight: number
}
