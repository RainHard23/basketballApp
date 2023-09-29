import React, {FC, ReactNode} from "react";
import styled from "styled-components";
import {colors} from "../../assests/styles/colors";

type AuthLayoutProps = {
    img: string;
    titleAuth: string;
    member: string;
    link: ReactNode;
    children: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({
                                             img,
                                             titleAuth,
                                             children,
                                             member,
                                             link,
                                         }) => {
    return (
        <AuthContainerLayout>
            <AuthLeftSide>
                <WrapperTitle>
                    <Title>{titleAuth}</Title>
                </WrapperTitle>
                {children}
                <AuthMember>
                    <Member>{member}</Member>
                    <AuthLink>{link}</AuthLink>
                </AuthMember>
            </AuthLeftSide>
            <AuthRightSide>
                <Img src={img} alt={`Image for ${titleAuth}`} />
            </AuthRightSide>
        </AuthContainerLayout>
    );
};

const AuthContainerLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AuthLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  width: 100%;
  height: 100%;
`;

const AuthMember = styled.div`
  display: flex;
  align-items: center;
  margin: 24px auto 0 auto;
`;

const Member = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: ${colors.grey};
`;

const AuthLink = styled.div`
  margin-left: 5px;
  color: ${colors.blue}; /* Added color for the link */
  cursor: pointer; /* Added cursor style */
`;

const WrapperTitle = styled.div`
  max-width: 366px;
  width: 100%;
  margin: 0 auto 32px auto;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 400;
  color: ${colors.blue};
`;

const AuthRightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130%;
  height: 100%;
  background-color: #f5fbff;
`;

const Img = styled.img`
  max-height: 100%;
`;

export default AuthLayout;