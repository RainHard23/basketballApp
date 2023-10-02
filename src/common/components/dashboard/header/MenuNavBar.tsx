import React from "react";
import styled from "styled-components";
// @ts-ignore
import { ReactComponent as IconSignOut } from "../../../../assests/icons/iconSignOut.svg";
// @ts-ignore
import { ReactComponent as IconTeams } from "../../../../assests/icons//iconTeams.svg";
// @ts-ignore
import { ReactComponent as IconPlayers } from '../../../../assests/icons/iconPlayers.svg'
import {colors} from "../../../../assests/styles/colors";


export const MenuNavBar = () => {
    return (
        <MenuContainer>
            <Nav>
                <NavItem href="#">
                    <IconTeams />
                    <LinkText>Teams</LinkText>
                </NavItem>
                <NavItem>
                    <IconPlayers />
                    <LinkText>Players</LinkText>
                </NavItem>
            </Nav>
            <NavItem>
                <IconSignOut />
                <LinkText>
                    <span>Sign out</span>
                </LinkText>
            </NavItem>
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

const NavItem = styled.a`
  cursor: pointer;
  display: flex;
  text-decoration: none;
  align-items: center;
  margin-bottom: 30px;
  flex-direction: column;
  color: ${colors.lightGrey};

  &:active {
    color: ${colors.red};

    svg {
      path {
        fill: ${colors.red};
      }
    }
  }
`;

const LinkText = styled.p`
  margin-top: 4px;

  & span {
    color: ${colors.lightestRed};
  }
`;

