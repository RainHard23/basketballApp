import { instance } from '../common/api/commonApi'

export const playersApi = {
  addPlayer(newPlayer: PlayerType) {
    return instance
      .post<PlayerType>('api/Player/Add', newPlayer)
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching teams:', error)
        throw error
      })
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
    return instance
      .get<PlayersType>('api/Player/GetPlayers', {
        params: paramsQuery,
      })
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching teams:', error)
        throw error
      })
  },
  getTeam(paramsQuery: any) {
    return instance
      .get<TeamType>('api/team/get', {
        params: { id: paramsQuery.team },
      })
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching teams:', error)
        throw error
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
}

export type ParamsType = {
  name: string
  page: number
  pageSize: number
}

export type TeamType = {
  id: number
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
  birthday: Date
  height: number
  id?: number
  name: string
  number: number
  position: string
  team: number
  teamName?: string
  weight: number
}