import { instance } from '../common/api/commonApi'

export const teamApi = {
  addTeam(newTeam: TeamType) {
    return instance
      .post<TeamType>('api/Team/Add', newTeam)
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching teams:', error)
        throw error
      })
  },
  getTeams(paramsQuery?: any) {
    return instance
      .get<TeamsType>('api/Team/GetTeams', {
        params: paramsQuery,
      })
      .then(res => res.data)
      .catch(error => {
        console.error('Error fetching teams:', error)
        throw error
      })
  },
  deleteTeam(teamId: number) {
    return instance.delete<TeamType>(`api/Team/Delete?id=${teamId}`)
  },
  updateTeam(model: TeamType) {
    return instance.put<TeamType>('api/Team/Update', model)
  },
  getTeamId(id?: string | number) {
    return instance
      .get<TeamType>('api/Team/Get', { params: { id: id } })
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
