import { instance } from '../common/api/commonApi'
import { PlayerType } from '../players/api'

const userJSON = localStorage.getItem('user')
const user = userJSON ? JSON.parse(userJSON) : ''

export const teamApi = {
  addTeam(newTeam: TeamType) {
    return instance
      .post<TeamType>('api/Team/Add', newTeam, {
        headers: { Authorization: 'Bearer ' + user.token },
      })
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching teams:', error)
        throw error
      })
  },
  getTeams(paramsQuery: any) {
    return instance
      .get<TeamsType>('api/Team/GetTeams', {
        headers: { Authorization: 'Bearer ' + user.token },
        params: paramsQuery,
      })
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching teams:', error)
        throw error
      })
  },
}

export type TeamsType = {
  count: number
  data: TeamType[]
  page: number
  size: number
}

export type TeamType = {
  conference: string
  division: string
  foundationYear: number
  id?: number
  imageUrl: string
  name: string
}
