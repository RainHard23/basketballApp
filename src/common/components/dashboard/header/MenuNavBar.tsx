import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import { ReactComponent as IconTeams } from '../../../../assests/icons//iconTeams.svg'
import { ReactComponent as IconPlayers } from '../../../../assests/icons/iconPlayers.svg'
import { ReactComponent as IconSignOut } from '../../../../assests/icons/iconSignOut.svg'
import { ReactComponent as IconUser } from '../../../../assests/icons/iconUser.svg'
import { colors } from '../../../../assests/styles/colors'
import { logout } from '../../../../module/auth/authSlice'
import styled from 'styled-components'
import { breakpoints } from '../../../../assests/styles/adaptive'

type PropsType = {
  onSidebar: boolean
}
export const MenuNavBar: FC<PropsType> = ({ onSidebar }) => {
  const dispatch = useDispatch()

  const location = useLocation()
  const currentPath = location.pathname

  const teamPaths = ['/', '/team', '/teams/create']
  const playerPaths = ['/players', '/team/:teamId/:playerId', '/team/:teamId/players/create']

  const isTeamsActive = teamPaths.includes(currentPath)
  const isPlayersActive = playerPaths.includes(currentPath)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <MenuContainer menuVision={onSidebar}>
      <Nav>
        <UserAccount>
          <UserImg />
          <UserName>John Smith</UserName>
        </UserAccount>
        <NavItem active={isTeamsActive} to={'/'}>
          <IconTeams />
          <LinkText>Teams</LinkText>
        </NavItem>
        <NavItem active={isPlayersActive} to={'/players'}>
          <IconPlayers />
          <LinkText>Players</LinkText>
        </NavItem>
      </Nav>
      <LogOut onClick={handleLogout}>
        <IconSignOut />
        <div>
          <span>Sign out</span>
        </div>
      </LogOut>
    </MenuContainer>
  )
}

const UserAccount = styled.div`
  display: none;

  @media screen and ${breakpoints.tablet} {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    margin-bottom: 24px;
    padding-left: 20px;
    border-bottom: 0.5px solid ${colors.lightGrey};
  }
`

const UserName = styled.span`
  color: ${colors.darkGrey};
`

const UserImg = styled(IconUser)`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`

const MenuContainer = styled.div<{ menuVision: boolean }>`
  width: 140px;
  z-index: 15;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  max-width: 140px;
  padding: 32px 0 32px 0;
  height: calc(100vh - 80px);

  @media screen and ${breakpoints.tablet} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    position: absolute;
    top: 62px;
    left: ${({ menuVision }) => (menuVision ? 0 : '-100%')};
    transition: left 0.3s linear;
    min-width: 200px;
    padding: 0 0 27px 0;
    height: calc(100vh - 62px);
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  @media screen and ${breakpoints.tablet} {
    align-items: flex-start;
  }
`

const NavItem = styled(NavLink)<{ active?: boolean }>`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  align-items: center;
  margin-bottom: 36px;
  flex-direction: column;
  color: ${props => (props.active ? colors.red : colors.lightGrey)};

  svg {
    path {
      fill: ${props => (props.active ? colors.red : colors.lightGrey)};
    }
  }

  &:hover {
    svg {
      path {
        fill: ${colors.red};
        transition: 0.1s linear;
      }
    }

    p {
      transition: 0.1s linear;
      color: ${colors.red};
    }
  }
  @media screen and ${breakpoints.tablet} {
    flex-direction: row;
    margin-bottom: 20px;
    padding-left: 20px;
    display: flex;
  }
`

const LogOut = styled.div`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  align-items: center;
  margin-bottom: 30px;
  flex-direction: column;
  color: ${colors.lightestRed};

  & span {
    @media screen and ${breakpoints.tablet} {
      display: flex;
      margin-left: 8px;
    }
  }

  &:hover {
    svg {
      path {
        fill: ${colors.red};
        transition: 0.1s linear;
      }
    }

    span {
      transition: 0.1s linear;
      color: ${colors.red};
    }
  }
  @media screen and ${breakpoints.tablet} {
    flex-direction: row;
    margin-bottom: 20px;
    padding-left: 20px;
    display: flex;
  }
`

const LinkText = styled.p`
  margin-top: 4px;
  text-decoration: none;

  & span {
    color: ${colors.lightestRed};
  }
  @media screen and ${breakpoints.tablet} {
    display: flex;
    margin-left: 8px;
  }
`
