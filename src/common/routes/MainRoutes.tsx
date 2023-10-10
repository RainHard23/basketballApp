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

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route element={<TeamsPage />} index path={'/'} />

          <Route element={<TeamDetail />} path={'/team/:teamId'} />
          <Route element={<TeamFormAdd />} path={'/teams/create'} />

          <Route element={<PlayersDetail />} path={'/team/:teamId/:playerId'} />
          <Route element={<PlayerFormAdd />} path={'/team/:teamId/players/create'} />
          <Route element={<PlayersPage />} path={'/players'} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route element={<Login />} path={'/login'} />
          <Route element={<Register />} path={'/register'} />
        </Route>

        <Route element={<NotFound />} path={'/404'} />
      </Routes>
    </BrowserRouter>
  )
}
