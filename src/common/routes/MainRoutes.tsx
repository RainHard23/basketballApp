import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { NotFound } from '../../pages/NotFound'
import { Login } from '../../pages/auth/Login'
import { Register } from '../../pages/auth/Register'
import { PlayerFormAdd } from '../../pages/dashboard/player/PlayerAdd'
import { PlayersDetail } from '../../pages/dashboard/player/PlayersDetailsInfo'
import { PlayersPage } from '../../pages/dashboard/player/PlayersPage'
import { TeamFormAdd } from '../../pages/dashboard/team/TeamAdd'
import { TeamDetail } from '../../pages/dashboard/team/TeamDetailsPage'
import { TeamsPage } from '../../pages/dashboard/team/TeamsPage'
import AuthLayout from '../layouts/AuthLayout'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { TeamFormEdit } from '../../pages/dashboard/team/TeamEdit'
import { PlayerFormEdit } from '../../pages/dashboard/player/PlayerEdit'

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route element={<TeamsPage />} index path={'/team'} />

          <Route element={<TeamDetail />} path={'/team/:teamId'} />
          <Route element={<TeamFormAdd />} path={'/team/create'} />
          <Route element={<TeamFormEdit />} path={'/team/edit/' + ':id'} />

          <Route element={<PlayersPage />} path={'/players'} />
          <Route element={<PlayerFormAdd />} path={'/players/create'} />
          <Route element={<PlayersDetail />} path={'/players/:teamId/:playerId'} />

          <Route element={<PlayerFormEdit />} path={'/players/edit/' + ':id'} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<Login />} path={'/login'} />
          <Route element={<Register />} path={'/register'} />
        </Route>

        <Route element={<NotFound />} path={'*'} />
      </Routes>
    </BrowserRouter>
  )
}
