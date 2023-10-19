import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { colors } from '../../assests/styles/colors'
import { selectIsLoggedIn } from '../../module/auth/auth.selectors'
import { Header } from '../components/dashboard/header/Header'
import { MenuNavBar } from '../components/dashboard/header/MenuNavBar'
import styled from 'styled-components'
import { breakpoints } from '../../assests/styles/adaptive'
import React, { useState } from 'react'

export const DashboardLayout = () => {
  const [onSidebar, setOnSidebar] = useState(false)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  const handleOnSidebar = () => {
    setOnSidebar(prevState => !prevState)
  }

  return (
    <Layout>
      <Header onSidebar={onSidebar} onOpenSideBar={handleOnSidebar} />
      <ContentWrapper>
        <MenuNavBar onSidebar={onSidebar} />
        <Content>
          <Outlet />
        </Content>
        <Overlay display={onSidebar} onClick={handleOnSidebar} />
      </ContentWrapper>
    </Layout>
  )
}

const Overlay = styled.div<{ display: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ display }) => (display ? 'block' : 'none')};
  z-index: 10;
`

export default Overlay

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

  @media screen and ${breakpoints.tablet} {
    padding: 16px 0;
    height: calc(100vh - 62px);
  }
`
