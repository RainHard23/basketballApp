import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import TeamRoster
    from "../../../common/components/dashboard/entities/teams/components/teamCard/TeamRosterPage/TeamRoster";
import {colors} from "../../../assests/styles/colors";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useActions} from "../../../api/common/hooks/useActions";
import {playersThunks} from "../../../module/players/playersSlice";
import {playersSelector} from "../../../module/players/playersSelectors";
import teamImg from './/../../../assests/images/fullIconTeam.png'

export const TeamDetail = () => {

    const {teamId} = useParams();

    const {getPlayersTC} = useActions(playersThunks);

    const {dataPlayers, team} = useSelector(playersSelector)


    const [parramsQuery, setParramsQuery] = useState(
        {
            paramsQuery: {
                name: "",
                page: 1,
                pageSize: 6,
                team: teamId,
            }
        }
    );


    useEffect(() => {
        getPlayersTC(parramsQuery);
    }, []);

    console.log(dataPlayers)


    return (
        <>
            {team && (
                <Container key={team.id}>
                    <Logo>
                        <Img src={team?.imageUrl || teamImg} alt={`Image of ${team.name}`}/>
                    </Logo>
                    <TeamInfo>
                        <Title>{team.name}</Title>
                        <InfoContainer>
                            <InfoRow>
                                <InfoWrapper>
                                    <ItemTitle>Year of foundation</ItemTitle>
                                    <ItemSubtitle>{team.foundationYear}</ItemSubtitle>
                                </InfoWrapper>
                                <InfoWrapper>
                                    <ItemTitle>Division</ItemTitle>
                                    <ItemSubtitle>{team.division}</ItemSubtitle>
                                </InfoWrapper>
                            </InfoRow>
                            <InfoRow>
                                <InfoWrapper>
                                    <ItemTitle>Conference</ItemTitle>
                                    <ItemSubtitle>{team.conference}</ItemSubtitle>
                                </InfoWrapper>
                            </InfoRow>
                        </InfoContainer>
                    </TeamInfo>
                </Container>
            )}
            <TeamRoster team={teamId} dataPlayers={dataPlayers}/>
        </>
    );
}

const Img = styled.img`
  max-height: 210px;
  max-width: 210px;
`
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

