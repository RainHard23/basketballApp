import { useSelector } from 'react-redux'
import { Navigate, Outlet, redirect, useNavigate } from 'react-router-dom'

import { colors } from '../../assests/styles/colors'
import { selectIsLoggedIn } from '../../module/auth/auth.selectors'
import { Header } from '../components/dashboard/header/Header'
import { MenuNavBar } from '../components/dashboard/header/MenuNavBar'
import styled from 'styled-components'

export const DashboardLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <Layout>
      <Header />
      <ContentWrapper>
        <MenuNavBar />
        <Content>
          <Outlet />
        </Content>
      </ContentWrapper>
    </Layout>
  )
}

const Layout = styled.div`
  background: ${colors.lightestGrey1};
  height: 100vh;
  position: relative;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const Content = styled.div`
  width: 100%;
  overflow-y: auto;
  padding: 32px 80px;
  height: calc(100vh - 80px);
`
