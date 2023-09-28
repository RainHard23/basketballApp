import styled from "styled-components";
import {colors} from "../../../assests/styles/colors";
import iconLogo from "../../../assests/images/iconLogo.png";
import iconUser from "../../../assests/icons/iconUser.svg"

export const Header = () => {

    return (
        <HeaderContainer>
            <HeaderLogo >
                <LogoLink src={iconLogo} alt="logo" />
            </HeaderLogo>
            <UserProfile>
                <UserName>John Smith</UserName>
                <UserImg src={iconUser} alt=""/>
            </UserProfile>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: ${colors.white};
  box-shadow: 0 1px 10px rgba(209, 209, 209, 0.5);
  margin: 0 auto;
  padding-left: 50px;
  padding-right: 50px;
  height: 80px;
`
const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-self: center;
  width: 137px;
  height: 34px;
  cursor: pointer;
  text-decoration: none;
`;
const LogoLink = styled.img`
  width: 100%;
  height: 100%;
`;
const UserImg = styled.img`
  width: 36px;
  height: 36px;
`;
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.p`
  margin-right: 19px;
  color: ${colors.darkGrey};
`;


