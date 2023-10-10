import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import { ReactComponent as IconTeams } from '../../../../assests/icons//iconTeams.svg'
import { ReactComponent as IconPlayers } from '../../../../assests/icons/iconPlayers.svg'
import { ReactComponent as IconSignOut } from '../../../../assests/icons/iconSignOut.svg'
import { colors } from '../../../../assests/styles/colors'
import { logout } from '../../../../module/auth/authSlice'
import styled from 'styled-components'

export const MenuNavBar = () => {
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
    <MenuContainer>
      <Nav>
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

const MenuContainer = styled.div`
  width: 201px;
  z-index: 15;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  transition: none;
  max-width: 140px;
  padding: 32px 0 32px 0;
  height: calc(100vh - 80px);
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
`

const NavItem = styled(NavLink)<{ active?: boolean }>`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  align-items: center;
  margin-bottom: 30px;
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
`

const LogOut = styled.div`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  align-items: center;
  margin-bottom: 30px;
  flex-direction: column;
  color: ${colors.lightestRed};

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
`

const LinkText = styled.p`
  margin-top: 4px;
  text-decoration: none;

  & span {
    color: ${colors.lightestRed};
  }
`
