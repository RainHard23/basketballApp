import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import iconUser from '../../../../assests/icons/iconUser.svg'
import { ReactComponent as IconBurgerMenu } from '../../../../assests/icons/iconBurgerMenu.svg'
import iconLogo from '../../../../assests/images/iconLogo.png'
import { colors } from '../../../../assests/styles/colors'

import styled from 'styled-components'
import { FC } from 'react'
import { breakpoints } from '../../../../assests/styles/adaptive'

type PropsType = {
  onSidebar: boolean
  onOpenSideBar: () => void
}
export const Header: FC<PropsType> = ({ onSidebar, onOpenSideBar }) => {
  return (
    <HeaderContainer>
      <IconSideBar onClick={onOpenSideBar}>
        {onSidebar ? <IconBurgerMenu /> : <IconBurgerMenu />}
      </IconSideBar>
      <HeaderLogo to={'/'}>
        <LogoLink alt={'logo'} src={iconLogo} />
      </HeaderLogo>
      <UserProfile>
        <UserName>John Smith</UserName>
        <UserImg alt={''} src={iconUser} />
      </UserProfile>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 50;
  background: ${colors.white};
  box-shadow: 0 1px 10px rgba(209, 209, 209, 0.5);
  margin: 0 auto;
  padding-left: 50px;
  padding-right: 50px;
  height: 80px;
  @media screen and ${breakpoints.tablet} {
    justify-content: center;
    height: 62px;
  }
`
const HeaderLogo = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-self: center;
  width: 191px;
  height: 48px;
  cursor: pointer;
  text-decoration: none;

  @media screen and ${breakpoints.tablet} {
    width: 140px;
    height: 36px;
  }
`
const LogoLink = styled.img`
  width: 100%;
  height: 100%;
`
const UserImg = styled.img`
  width: 36px;
  height: 36px;
`
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and ${breakpoints.tablet} {
    display: none;
  }
`

const UserName = styled.p`
  margin-right: 19px;
  color: ${colors.darkGrey};
`
const IconSideBar = styled.div`
  display: none;

  @media screen and ${breakpoints.tablet} {
    display: block;
    position: absolute;
    height: 40px;
    top: 20px;
    left: 15px;
    z-index: 100;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`
