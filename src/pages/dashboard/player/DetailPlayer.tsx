import React from 'react';
import styled from 'styled-components';
import imageTeam from '../../../assests/images/fullIconTeam.png';

import TeamRoster from "../../../common/components/dashboard/entities/teams/components/teamCard/TeamRosterPage/TeamRoster";
import {colors} from "../../../assests/styles/colors";


export const TeamDetailsPage = () => {
    return (
        <>
            <Container>
                <Logo>
                    <img src={imageTeam} alt="ImageTeam"/>
                </Logo>
                <TeamInfo>
                    <Title>Denver Nuggets</Title>
                    <InfoContainer>
                        <InfoRow>
                            <InfoWrapper>
                                <ItemTitle>Year of foundation</ItemTitle>
                                <ItemSubtitle>1976</ItemSubtitle>
                            </InfoWrapper>
                            <InfoWrapper>
                                <ItemTitle>Division</ItemTitle>
                                <ItemSubtitle>Northwestern</ItemSubtitle>
                            </InfoWrapper>
                        </InfoRow>
                        <InfoRow>
                            <InfoWrapper>
                                <ItemTitle>Conference</ItemTitle>
                                <ItemSubtitle>Western</ItemSubtitle>
                            </InfoWrapper>
                        </InfoRow>
                    </InfoContainer>
                </TeamInfo>
            </Container>
            <TeamRoster/>
        </>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, rgba(112, 112, 112, 1), rgba(57, 57, 57, 1));
  border-radius: 15px;
`;

const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeamInfo = styled.div`
  width: 130%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 65px 0;
`;

const Title = styled.h1`
  font-size: 36px;
  line-height: 49px;
  font-weight: 800;
  color: ${colors.white};
  margin-bottom: 60px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 54px;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-right: 84px; 
  }
`;

const ItemTitle = styled.span`
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  color: ${colors.white};
  margin-bottom: 10px;
`;

const ItemSubtitle = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  color: ${colors.white};
`;


