import React from "react";
import styled from "styled-components";
// @ts-ignore
import {ReactComponent as IconSignOut} from "../../../../assests/icons/iconSignOut.svg";
// @ts-ignore
import {ReactComponent as IconTeams} from "../../../../assests/icons//iconTeams.svg";
// @ts-ignore
import {ReactComponent as IconPlayers} from '../../../../assests/icons/iconPlayers.svg'
import {colors} from "../../../../assests/styles/colors";
import {useActions} from "../../../../api/common/hooks/useActions";
import {authSlice, authThunks, logout} from "../../../../module/auth/authSlice";
import {useDispatch} from "react-redux";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {Login} from "../../../../pages/auth/Login";


export const MenuNavBar = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const currentPath = location.pathname;

    const isTeamsActive = currentPath === "/";
    const isPlayersActive = currentPath === "/players";

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <MenuContainer>
            <Nav>
                <NavItem to='/' active={isTeamsActive}>
                    <IconTeams/>
                    <LinkText >Teams</LinkText>
                </NavItem>
                <NavItem to='/players' active={isPlayersActive}>
                    <IconPlayers/>
                    <LinkText >Players</LinkText>
                </NavItem>
            </Nav>
            <LogOut onClick={handleLogout}>
                <IconSignOut/>
                <div>
                    <span>Sign out</span>
                </div>
            </LogOut>
        </MenuContainer>
    );
};

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
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const NavItem = styled(NavLink)<{ active?: boolean}>`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  align-items: center;
  margin-bottom: 30px;
  flex-direction: column;
  color: ${props => props.active ? colors.red : colors.lightGrey};
  svg {
    path {
      fill: ${props => props.active ? colors.red : colors.lightGrey};
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
`;

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
`;

